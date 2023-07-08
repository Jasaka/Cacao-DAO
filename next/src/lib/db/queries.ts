// User Queries
export const getUsers = 'SELECT * FROM users';

export const getUserById = 'SELECT users.id, users."walletId", users.name, users."imageUrl", users.about, roles.role, users.email FROM (users INNER JOIN roles ON users.role = roles.id) WHERE users.id = $1 LIMIT 1';

export const getUserByWalletId = 'SELECT users.id, users."walletId", users.name, users.email, users."imageUrl", users.about, roles.role FROM (users INNER JOIN roles ON users.role = roles.id) WHERE users."walletId" = $1 LIMIT 1';

export const createUser = 'INSERT INTO users ("walletId") VALUES ($1) RETURNING *';

export const updateUser = 'UPDATE users SET name = $1, "imageUrl" = $2, about = $3, email = $4 WHERE "walletId" = $5 RETURNING *';

// Proposal Queries

export const getProposals = 'SELECT * FROM proposals';

export const getProposalById = 'SELECT * FROM proposals WHERE proposals.id = $1';

export const getProposalByHash =
  'SELECT * FROM (proposals INNER JOIN users ON proposals."authorId" = users.id) WHERE "currentHash" = $1';

export const getProposalFlags = 'SELECT * FROM ("proposalFlags" INNER JOIN users ON "proposalFlags"."authorId" = users.id INNER JOIN proposals ON "proposalFlags"."proposalHash" = proposals."currentHash") ';

export const getProposalVotesByProposalId = 'SELECT * FROM "votes" WHERE "proposalId" = $1';

export const getProposalFlagsByProposalId = 'SELECT * FROM "proposalFlags" JOIN "proposals" ON "proposalHash" = "currentHash" WHERE proposals.id = $1';

export const createProposal =
  'INSERT INTO "proposals" (id, title, description, "authorId", "currentHash", "predictedCost", "status", "cycleId") VALUES ($1, $2, $3, $4, $5, $6, 1) RETURNING *';

export const createProposalFlag =
  'INSERT INTO "proposalFlags" (id, "reason", "authorId", "authorIsPublic", "proposalHash") VALUES ($1, $2, $3, $4, $5) RETURNING *';

export const createVersionHistoryEntry =
  'INSERT INTO "versionHistory" (hash, "arweaveId", "proposalId") VALUES ($1, $2, $3) RETURNING *';

export const getVersionHistoryByProposalId = 'SELECT * FROM "versionHistory" WHERE "proposalId" = $1';

// Cycle Queries
export const getLatestCycle = 'SELECT * FROM cycles ORDER BY "startDate" DESC LIMIT 1';

export const createCycle = 'INSERT INTO cycles ("cycleId", status, "votingEndDate", "proposingEndDate", "startDate") VALUES ($1, 0, now() + interval \'14 day\', now() + interval \'7 day\', now()) RETURNING *';

export const updateCycle = 'UPDATE cycles SET status = $2 WHERE "cycleId" = $1 RETURNING *';

// Navigation Query
export const getNavigation = 'SELECT * FROM navigation ORDER BY "order"';

export const getCurrentUserVotes = 'SELECT * FROM "votes" WHERE "voterId" = $1 AND "cycleId" = $2';

export const insertVote = 'INSERT INTO "votes" ("proposalId", "voterId", "voteValue", "cycleId") VALUES ($1, $2, $3, $4) RETURNING *';

export const replaceVote = 'UPDATE "votes" SET "voteValue" = $1 WHERE "id" = $2 RETURNING *';