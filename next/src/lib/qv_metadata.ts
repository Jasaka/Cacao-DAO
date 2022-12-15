const contract = {
  "compiler": {
  "version": "0.8.7+commit.e28d00a7"
},
  "language": "Solidity",
  "output": {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "initialProposingPeriod",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "initialVotingPeriod",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "initialProposalThreshold",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "cycleHash",
          "type": "bytes32"
        }
      ],
      "name": "CycleCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "additionalDays",
          "type": "uint256"
        }
      ],
      "name": "ExtendedProposalPeriod",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "cycleHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "proposalHash",
          "type": "string"
        }
      ],
      "name": "ProposalCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "oldProposalThreshold",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newProposalThreshold",
          "type": "uint256"
        }
      ],
      "name": "ProposalThresholdSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "oldProposingPeriod",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newProposingPeriod",
          "type": "uint256"
        }
      ],
      "name": "ProposingPeriodSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "proposalHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "voteDirection",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "castVotes",
          "type": "uint256"
        }
      ],
      "name": "VoteCast",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "oldVotingPeriod",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newVotingPeriod",
          "type": "uint256"
        }
      ],
      "name": "VotingPeriodSet",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voterAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_proposalHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_numTokens",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_voteDirection",
          "type": "bool"
        }
      ],
      "name": "castVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_cycleHash",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "_proposalHash",
          "type": "string"
        }
      ],
      "name": "countVotesForProposal",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_proposalHash",
          "type": "string"
        }
      ],
      "name": "createProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "cycles",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "cycleHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "proposingDeadline",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "proposalCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votingCredits",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_additionalDays",
          "type": "uint256"
        }
      ],
      "name": "extendCycle",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentCycleHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_cycleHash",
          "type": "bytes32"
        }
      ],
      "name": "getCycleProposingDeadline",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_cycleHash",
          "type": "bytes32"
        }
      ],
      "name": "getCycleStatus",
      "outputs": [
        {
          "internalType": "enum QuadraticVoting.CycleStatus",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_cycleHash",
          "type": "bytes32"
        }
      ],
      "name": "getCycleVotingDeadline",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proposalThreshold",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proposingPeriod",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newProposalThreshold",
          "type": "uint256"
        }
      ],
      "name": "setProposalThreshold",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newProposingPeriod",
          "type": "uint256"
        }
      ],
      "name": "setProposingPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newVotingPeriod",
          "type": "uint256"
        }
      ],
      "name": "setVotingPeriod",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingPeriod",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
    "devdoc": {
    "kind": "dev",
      "methods": {
      "owner()": {
        "details": "Returns the address of the current owner."
      },
      "renounceOwnership()": {
        "details": "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."
      },
      "transferOwnership(address)": {
        "details": "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."
      }
    },
    "version": 1
  },
  "userdoc": {
    "kind": "user",
      "methods": {
      "castVote(address,string,uint256,bool)": {
        "notice": "Voting on a particular proposal only possible once. _voteDirection: true for positive votes, false for negative votes"
      },
      "countVotesForProposal(bytes32,string)": {
        "notice": "status ENDED not necessarily needed -> call anytime possible, e.g. for statistical analysis"
      }
    },
    "version": 1
  }
},
  "settings": {
  "compilationTarget": {
    "github/Jasaka/Cacao-DAO/14-quadratic-voting/hardhat/contracts/QuadraticVoting.sol": "QuadraticVoting"
  },
  "evmVersion": "london",
    "libraries": {},
  "metadata": {
    "bytecodeHash": "ipfs"
  },
  "optimizer": {
    "enabled": false,
      "runs": 200
  },
  "remappings": []
},
  "sources": {
  "@openzeppelin/contracts/access/AccessControl.sol": {
    "keccak256": "0x67e3daf189111d6d5b0464ed09cf9f0605a22c4b965a7fcecd707101faff008a",
      "license": "MIT",
      "urls": [
      "bzz-raw://cbbb1a75e4064d564bf69e74970eef35064e51fcc09cbf3589aee7faa60d6afe",
      "dweb:/ipfs/QmYfAtQwFSGmxomnyAV3tpBDbfDwiFXV61osWW2zzQVg5Q"
    ]
  },
  "@openzeppelin/contracts/access/IAccessControl.sol": {
    "keccak256": "0x59ce320a585d7e1f163cd70390a0ef2ff9cec832e2aa544293a00692465a7a57",
      "license": "MIT",
      "urls": [
      "bzz-raw://bb2c137c343ef0c4c7ce7b18c1d108afdc9d315a04e48307288d2d05adcbde3a",
      "dweb:/ipfs/QmUxhrAQM3MM3FF5j7AtcXLXguWCJBHJ14BRdVtuoQc8Fh"
    ]
  },
  "@openzeppelin/contracts/access/Ownable.sol": {
    "keccak256": "0xa94b34880e3c1b0b931662cb1c09e5dfa6662f31cba80e07c5ee71cd135c9673",
      "license": "MIT",
      "urls": [
      "bzz-raw://40fb1b5102468f783961d0af743f91b9980cf66b50d1d12009f6bb1869cea4d2",
      "dweb:/ipfs/QmYqEbJML4jB1GHbzD4cUZDtJg5wVwNm3vDJq1GbyDus8y"
    ]
  },
  "@openzeppelin/contracts/utils/Context.sol": {
    "keccak256": "0xe2e337e6dde9ef6b680e07338c493ebea1b5fd09b43424112868e9cc1706bca7",
      "license": "MIT",
      "urls": [
      "bzz-raw://6df0ddf21ce9f58271bdfaa85cde98b200ef242a05a3f85c2bc10a8294800a92",
      "dweb:/ipfs/QmRK2Y5Yc6BK7tGKkgsgn3aJEQGi5aakeSPZvS65PV8Xp3"
    ]
  },
  "@openzeppelin/contracts/utils/Strings.sol": {
    "keccak256": "0xa4d1d62251f8574deb032a35fc948386a9b4de74b812d4f545a1ac120486b48a",
      "license": "MIT",
      "urls": [
      "bzz-raw://8c969013129ba9e651a20735ef659fef6d8a1139ea3607bd4b26ddea2d645634",
      "dweb:/ipfs/QmVhVa6LGuzAcB8qgDtVHRkucn4ihj5UZr8xBLcJkP6ucb"
    ]
  },
  "@openzeppelin/contracts/utils/introspection/ERC165.sol": {
    "keccak256": "0xd10975de010d89fd1c78dc5e8a9a7e7f496198085c151648f20cba166b32582b",
      "license": "MIT",
      "urls": [
      "bzz-raw://fb0048dee081f6fffa5f74afc3fb328483c2a30504e94a0ddd2a5114d731ec4d",
      "dweb:/ipfs/QmZptt1nmYoA5SgjwnSgWqgUSDgm4q52Yos3xhnMv3MV43"
    ]
  },
  "@openzeppelin/contracts/utils/introspection/IERC165.sol": {
    "keccak256": "0x447a5f3ddc18419d41ff92b3773fb86471b1db25773e07f877f548918a185bf1",
      "license": "MIT",
      "urls": [
      "bzz-raw://be161e54f24e5c6fae81a12db1a8ae87bc5ae1b0ddc805d82a1440a68455088f",
      "dweb:/ipfs/QmP7C3CHdY9urF4dEMb9wmsp1wMxHF6nhA2yQE5SKiPAdy"
    ]
  },
  "@openzeppelin/contracts/utils/math/Math.sol": {
    "keccak256": "0xa1e8e83cd0087785df04ac79fb395d9f3684caeaf973d9e2c71caef723a3a5d6",
      "license": "MIT",
      "urls": [
      "bzz-raw://33bbf48cc069be677705037ba7520c22b1b622c23b33e1a71495f2d36549d40b",
      "dweb:/ipfs/Qmct36zWXv3j7LZB83uwbg7TXwnZSN1fqHNDZ93GG98bGz"
    ]
  },
  "@openzeppelin/contracts/utils/math/SafeMath.sol": {
    "keccak256": "0x0f633a0223d9a1dcccfcf38a64c9de0874dfcbfac0c6941ccf074d63a2ce0e1e",
      "license": "MIT",
      "urls": [
      "bzz-raw://864a40efcffdf408044c332a5aa38ec5618ed7b4eecb8f65faf45671bd6cdc65",
      "dweb:/ipfs/QmQJquTMtc6fgm5JQzGdsGpA2fqBe3MHWEdt2qzaLySMdN"
    ]
  },
  "github/Jasaka/Cacao-DAO/14-quadratic-voting/hardhat/contracts/CycleSettings.sol": {
    "keccak256": "0x2798554062279a1de5f32a2ad4c94a81c19059821f0082677397167756a8f832",
      "urls": [
      "bzz-raw://fd23a020502d62bd52fc53f1b6529ee2eb31b44eed138d972a81c2b706d3e5b5",
      "dweb:/ipfs/QmXqUk43s6XymFx6sFfahiqSSykV5yM7gsKygZgFNgyCeb"
    ]
  },
  "github/Jasaka/Cacao-DAO/14-quadratic-voting/hardhat/contracts/QuadraticVoting.sol": {
    "keccak256": "0xffe03204a23af6bbe65ae0314c2276ac4cae1bcd6b84f7172ffa0fb8c293acb5",
      "urls": [
      "bzz-raw://32484442afd9e6ea0022411ef358ba16db729f85aee2c20e4c33279eb5ca3d36",
      "dweb:/ipfs/QmWzED3GE2N89MJpDNc6uQBc7yJJx9m6E1FHWDMWD5NdgS"
    ]
  }
},
  "version": 1
}

export default contract;