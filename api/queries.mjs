export const getUsers = 'SELECT * FROM users';

export const getUserById = 'SELECT * FROM users WHERE id = $1';

export const getProposals = 'SELECT * FROM proposals';

export const getProposalById = 'SELECT * FROM proposals WHERE id = $1';

export const getProposalFlags = 'SELECT * FROM proposalFlags';

export const getProposalFlagsByProposalId = 'SELECT\n' +
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
