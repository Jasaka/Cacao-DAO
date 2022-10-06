export const getUsers = 'SELECT * FROM users';

export const getUserById = 'SELECT * FROM users WHERE id = $1';

export const getProposals = 'SELECT * FROM proposals';

export const getProposalById = 'SELECT * FROM proposals WHERE id = $1';

export const getProposalByHash =
  'SELECT * FROM proposals WHERE "currentHash" = $1';

export const getProposalFlags = 'SELECT * FROM "proposalFlags"';

export const getProposalFlagsByProposalId =
  'SELECT\n' +
  '    *\n' +
  'FROM\n' +
  '    "proposalFlags"\n' +
  'WHERE\n' +
  '    "proposalHash" IN (\n' +
  '        SELECT\n' +
  '            proposals."currentHash"\n' +
  '        FROM\n' +
  '            proposals\n' +
  '        WHERE\n' +
  '            id = $1\n' +
  '    )';

// validate Login select true if username and passwordHash match provided values
export const validateLogin =
  'SELECT * FROM users WHERE username = $1 AND "passwordHash" = $2';

export const createProposal =
  'INSERT INTO "proposals" (id, title, description, "predictedCost", "currentHash", "arweaveId") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

export const createProposalFlag =
  'INSERT INTO "proposalFlags" (id, "proposalId", "proposalHash", "flagMessage", "flagAuthorId") VALUES ($1, $2, $3, $4, $5) RETURNING *';

export const initiateNewSession =
  'INSERT INTO "openSessions" ("sessionToken", "userId", "expirationDate") VALUES ($1, $2, $3) RETURNING *';

export const validateSession =
  'SELECT * FROM "openSessions" WHERE "sessionToken" = $1';

export const deleteSession =
  'DELETE FROM "openSessions" WHERE "sessionToken" = $1';
