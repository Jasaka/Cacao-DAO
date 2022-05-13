import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import pkg from 'pg';
import * as queries from './queries.mjs'

const port = process.env.PORT || 8000
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

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.get('/users', async (req, res) => {
    pool().query(queries.getUsers)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

// get user by id
server.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    pool().query(queries.getUserById, [id])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

// get proposals
server.get('/proposals', async (req, res) => {
    pool().query(queries.getProposals)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

// get proposal by id
server.get('/proposals/:id', async (req, res) => {
    const id = req.params.id;
    pool().query(queries.getProposalById, [id])
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
    pool().query(queries.getProposalFlagsByProposalId, [id])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});

server.get('/proposalFlags', async (req, res) => {
    pool().query(queries.getProposalFlags)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.message});
        });
});






server.listen(port, () => console.log(`Listening on port ${port}`));