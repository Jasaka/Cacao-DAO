import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import pkg from 'pg';
import * as dbQueries from './dbQueries.mjs'
import * as arweaveQueries from './arweaveQueries.mjs'
import * as crypto from "crypto";
import * as uuid from "uuid";

const port = process.env.PORT || 5000
const {Pool} = pkg;

const upload = multer();

const server = express();
const urlParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

const pool = () => {
    if (process.env.NODE_ENV === 'local') {
        return new Pool({
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            port: process.env.PG_PORT,
            ssl: {
                rejectUnauthorized: false
            }
        });
    } else {
        return new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
}

server.use(urlParser);
server.use(jsonParser);
server.use(cookieParser());

server.get('/', (req, res) => {
    res.send('Hello World!');
});


server.post('/login', async (req, res) => {
    let cookie = req.cookies.cookie;

    if (cookie === undefined) {
        const {userName, password} = req.body;
        const userId = await getIdFromLoginData(userName, password)
        if (userId !== null) {
            const sessionId = crypto.randomBytes(16).toString('hex');
            const expirationDate = new Date(Date.now() + 5 * 60 * 60 * 1000);

            pool().query(dbQueries.initiateNewSession, [sessionId, userId, expirationDate])
                .then(() => {
                    res.cookie('cookie', sessionId, {expires: expirationDate, httpOnly: true});
                    res.send('Check your cookies. One should be in there now');
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({error: err.message});
                });
        } else {
            res.status(401).json({error: 'Invalid username or password'});
        }
    } else {
        if (await isSessionValid(cookie)) {
            res.send('Session is valid');
        } else {
            res.status(401).json({error: 'Invalid session'});
        }
    }
});

server.get('/users', async (req, res) => {
    pool().query(dbQueries.getUsers)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

server.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    pool().query(dbQueries.getUserById, [id])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

server.get('/proposals', async (req, res) => {
    pool().query(dbQueries.getProposals)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

server.post('/proposals', upload.none(), async (req, res) => {
    let cookie = req.cookies.cookie;

    if (await isSessionValid(cookie)) {
        const {title, description, predictedCost} = req.body;
        const userId = getUserIdFromSession(req.headers.token);
        const proposalId = generateUUId();
        const proposalHash = generateProposalHash(proposalId, title, description, predictedCost);
        if (userId !== null) {
            pool().query(dbQueries.createProposal, [proposalId, title, description, predictedCost, proposalHash])
                .then(result => {
                    res.json(result.rows);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({error: err.message});
                });
        } else {
            res.status(401).json({error: 'Invalid session'});
        }
    } else {
        res.status(401).json({error: 'Invalid session'});
    }
});

server.get('/proposals/:id', async (req, res) => {
    const id = req.params.id;
    pool().query(dbQueries.getProposalById, [id])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

server.get('/proposals/:id/flags', async (req, res) => {
    const id = req.params.id;
    pool().query(dbQueries.getProposalFlagsByProposalId, [id])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

server.post('/proposals/:id/flags', upload.none(), async (req, res) => {
    let cookie = req.cookies.cookie;

    if (await isSessionValid(cookie)) {
        console.log(req.body);
        const proposalId = req.params.id;
        const {proposalHash, flagMessage, providesFlagAuthorId} = req.body;
        const userId = await getUserIdFromSession(cookie);
        console.log("proposalId: " + proposalId + " userId: " + userId + " proposalHash: " + proposalHash + " flagMessage: " + flagMessage + " flagAuthorId: " + providesFlagAuthorId);
        let authorId = null;
        if (providesFlagAuthorId === true) {
            authorId = userId;
        }
        if (userId !== null) {
            pool().query(dbQueries.createProposalFlag, [generateUUId(), proposalHash, flagMessage, proposalId, authorId])
                .then(result => {
                    res.json(result.rows);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({error: err.message});
                });
        } else {
            res.status(401).json({error: 'Invalid session'});
        }
    } else {
        res.status(401).json({error: 'Invalid session'});
    }
});

server.get('/proposalFlags', async (req, res) => {
    pool().query(dbQueries.getProposalFlags)
        .then(result => {
            console.log(result.rows);
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

async function isSessionValid(cookie) {
    return new Promise((resolve, reject) => {
        pool().query(dbQueries.validateSession, [cookie], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.rows.length === 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        });
    });
}

function getUserIdFromSession(token) {
    return pool().query(dbQueries.validateSession, [token])
        .then(result => {
            if (result.rows.length === 0) {
                return null;
            } else {
                const expirationDate = new Date(result.rows[0].expirationDate);
                if (expirationDate < new Date()) {
                    pool().query(dbQueries.deleteSession, [token])
                        .catch(err => {
                            console.error(err);
                        });
                    return null;
                } else {
                    return result.rows[0].userId;
                }
            }
        })
        .catch(err => {
            console.error(err);
            return null;
        });
}

function getIdFromLoginData(username, password) {
    const passwordHash = generateHash(password);
    return pool().query(dbQueries.validateLogin, [username, passwordHash])
        .then(result => {
            if (result.rowCount === 0) {
                return null;
            } else {
                return result.rows[0].id;
            }
        })
        .catch(err => {
            console.error(err);
            return false;
        });
}

function generateProposalHash(uuid, title, description, predictedCost) {
    if (predictedCost === undefined || predictedCost === null) {
        predictedCost = 0;
    }

    const proposal = {
        uuid: uuid,
        title: title,
        description: description,
        predictedCost: predictedCost
    };

    return generateHash(JSON.stringify(proposal));
}

function generateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

function generateUUId() {
    return uuid.v4();
}