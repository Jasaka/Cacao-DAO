// User Queries
export const getUsers = 'SELECT * FROM users';

export const getUserById = 'SELECT users.id, users."walletId", users.name, users."imageURL", users.about, roles.role FROM (users INNER JOIN roles ON users.role = roles.id) WHERE users.id = $1 LIMIT 1';

export const getUserByWalletId = 'SELECT users.id, users."walletId", users.name, users.email, users."imageURL", users.about, roles.role FROM (users INNER JOIN roles ON users.role = roles.id) WHERE users."walletId" = $1 LIMIT 1';

export const createUser = 'INSERT INTO users ("walletId") VALUES ($1) RETURNING *';

export const updateUser = 'UPDATE users SET name = $1, "imageURL" = $2, about = $3, email = $4 WHERE "walletId" = $5 RETURNING *';

// Proposal Queries

export const getProposals = 'SELECT * FROM (proposals INNER JOIN users ON proposals."authorId" = users.id)';

export const getProposalById = 'SELECT * FROM (proposals INNER JOIN users ON proposals."authorId" = users.id) WHERE proposals.id = $1';

export const getProposalByHash =
  'SELECT * FROM (proposals INNER JOIN users ON proposals."authorId" = users.id) WHERE "currentHash" = $1';

export const getProposalFlags = 'SELECT * FROM ("proposalFlags" INNER JOIN users ON "proposalFlags"."authorId" = users.id INNER JOIN proposals ON "proposalFlags"."proposalHash" = proposals."currentHash") ';

export const getProposalFlagsByProposalId = 'SELECT * FROM ("proposalFlags" INNER JOIN users ON "proposalFlags"."authorId" = users.id INNER JOIN proposals ON "proposalFlags"."proposalHash" = proposals."currentHash") WHERE proposals.id = $1';

export const createProposal =
  'INSERT INTO "proposals" (id, title, description, "authorId", "currentHash", "predictedCost", "status", "cycleId") VALUES ($1, $2, $3, $4, $5, $6, 1) RETURNING *';

export const createProposalFlag =
  'INSERT INTO "proposalFlags" (id, "reason", "authorId", "authorIsPublic", "proposalHash") VALUES ($1, $2, $3, $4, $5) RETURNING *';

export const createVersionHistoryEntry =
  'INSERT INTO "versionHistory" (hash, "arweaveId", "proposalId") VALUES ($1, $2, $3) RETURNING *';

export const getAllProposalFlags = 'SELECT * FROM "proposalFlags"';

// Cycle Queries

// Navigation Query
export const getNavigation = 'SELECT * FROM navigation ORDER BY "order"';