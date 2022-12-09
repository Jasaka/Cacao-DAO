/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  QuadraticVoting,
  QuadraticVotingInterface,
} from "../../contracts/QuadraticVoting";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialProposingPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "initialVotingPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "initialProposalThreshold",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "cycleHash",
        type: "bytes32",
      },
    ],
    name: "CycleCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "additionalDays",
        type: "uint256",
      },
    ],
    name: "ExtendedProposalPeriod",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "cycleHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "proposalHash",
        type: "string",
      },
    ],
    name: "ProposalCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldProposalThreshold",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newProposalThreshold",
        type: "uint256",
      },
    ],
    name: "ProposalThresholdSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldProposingPeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newProposingPeriod",
        type: "uint256",
      },
    ],
    name: "ProposingPeriodSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "proposalHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "voteDirection",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "castVotes",
        type: "uint256",
      },
    ],
    name: "VoteCast",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldVotingPeriod",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newVotingPeriod",
        type: "uint256",
      },
    ],
    name: "VotingPeriodSet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voterAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_proposalHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_numTokens",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_voteDirection",
        type: "bool",
      },
    ],
    name: "castVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_cycleHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "_proposalHash",
        type: "string",
      },
    ],
    name: "countVotesForProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_proposalHash",
        type: "string",
      },
    ],
    name: "createProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "cycles",
    outputs: [
      {
        internalType: "bytes32",
        name: "cycleHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "proposingDeadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votingCredits",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_additionalDays",
        type: "uint256",
      },
    ],
    name: "extendCycle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentCycleHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_cycleHash",
        type: "bytes32",
      },
    ],
    name: "getCycleProposingDeadline",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_cycleHash",
        type: "bytes32",
      },
    ],
    name: "getCycleStatus",
    outputs: [
      {
        internalType: "enum QuadraticVoting.CycleStatus",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_cycleHash",
        type: "bytes32",
      },
    ],
    name: "getCycleVotingDeadline",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposingPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newProposalThreshold",
        type: "uint256",
      },
    ],
    name: "setProposalThreshold",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newProposingPeriod",
        type: "uint256",
      },
    ],
    name: "setProposingPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newVotingPeriod",
        type: "uint256",
      },
    ],
    name: "setVotingPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "votingPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002bae38038062002bae833981810160405281019062000037919062000436565b8282826200005a6200004e6200009960201b60201c565b620000a160201b60201c565b6200006b836200016560201b60201c565b6200007c826200020260201b60201c565b6200008d816200029f60201b60201c565b5050505050506200071b565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b620001756200033c60201b60201c565b60008111620001bb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001b29062000519565b60405180910390fd5b7f3c3b22cef1385e7e3a7aee7a13e0c406644197372c4c7e697fd1981f1f6e75e760015482604051620001f09291906200054c565b60405180910390a18060018190555050565b620002126200033c60201b60201c565b6000811162000258576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200024f90620005ef565b60405180910390fd5b7f7e3f7f0708a84de9203036abaa450dccc85ad5ff52f78c170f3edb55cf5e8828600254826040516200028d9291906200054c565b60405180910390a18060028190555050565b620002af6200033c60201b60201c565b60008111620002f5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002ec9062000687565b60405180910390fd5b7fccb45da8d5717e6c4544694297c4ba5cf151d455c9bb0ed4fc7a38411bc05461600354826040516200032a9291906200054c565b60405180910390a18060038190555050565b6200034c6200009960201b60201c565b73ffffffffffffffffffffffffffffffffffffffff1662000372620003cd60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff1614620003cb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620003c290620006f9565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080fd5b6000819050919050565b6200041081620003fb565b81146200041c57600080fd5b50565b600081519050620004308162000405565b92915050565b600080600060608486031215620004525762000451620003f6565b5b600062000462868287016200041f565b935050602062000475868287016200041f565b925050604062000488868287016200041f565b9150509250925092565b600082825260208201905092915050565b7f4379636c6553657474696e67733a2070726f706f73696e6720706572696f642060008201527f746f6f206c6f7700000000000000000000000000000000000000000000000000602082015250565b60006200050160278362000492565b91506200050e82620004a3565b604082019050919050565b600060208201905081810360008301526200053481620004f2565b9050919050565b6200054681620003fb565b82525050565b60006040820190506200056360008301856200053b565b6200057260208301846200053b565b9392505050565b7f4379636c6553657474696e67733a20766f74696e6720706572696f6420746f6f60008201527f206c6f7700000000000000000000000000000000000000000000000000000000602082015250565b6000620005d760248362000492565b9150620005e48262000579565b604082019050919050565b600060208201905081810360008301526200060a81620005c8565b9050919050565b7f4379636c6553657474696e67733a2070726f706f73616c207468726573686f6c60008201527f6420746f6f206c6f770000000000000000000000000000000000000000000000602082015250565b60006200066f60298362000492565b91506200067c8262000611565b604082019050919050565b60006020820190508181036000830152620006a28162000660565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000620006e160208362000492565b9150620006ee82620006a9565b602082019050919050565b600060208201905081810360008301526200071481620006d2565b9050919050565b612483806200072b6000396000f3fe608060405234801561001057600080fd5b50600436106101155760003560e01c80637d9ae22b116100a2578063cd0b5db611610071578063cd0b5db6146102d2578063e063c8d3146102ee578063ea0217cf1461031e578063ece40cc11461033a578063f2fde38b1461035657610115565b80637d9ae22b1461025c57806387c37cfd1461027a5780638da5cb5b14610296578063b58131b0146102b457610115565b8063263df4d1116100e9578063263df4d1146101ba5780633712a5b2146101ea57806349c2a1a61461021a5780634b5b119914610236578063715018a61461025257610115565b80624094901461011a57806302a251a31461014d5780630930601f1461016b57806311fb6bd31461019c575b600080fd5b610134600480360381019061012f91906115b3565b610372565b6040516101449493929190611608565b60405180910390f35b6101556103a2565b604051610162919061164d565b60405180910390f35b610185600480360381019061018091906116cd565b6103ba565b60405161019392919061172d565b60405180910390f35b6101a4610607565b6040516101b1919061164d565b60405180910390f35b6101d460048036038101906101cf91906115b3565b61061f565b6040516101e1919061164d565b60405180910390f35b61020460048036038101906101ff91906115b3565b61063f565b60405161021191906117cd565b60405180910390f35b610234600480360381019061022f91906117e8565b6106fc565b005b610250600480360381019061024b9190611861565b610997565b005b61025a610a86565b005b610264610a9a565b604051610271919061188e565b60405180910390f35b610294600480360381019061028f9190611861565b610aa4565b005b61029e610b34565b6040516102ab91906118ea565b60405180910390f35b6102bc610b5d565b6040516102c9919061164d565b60405180910390f35b6102ec60048036038101906102e79190611969565b610b67565b005b610308600480360381019061030391906115b3565b610f28565b604051610315919061164d565b60405180910390f35b61033860048036038101906103339190611861565b610f5a565b005b610354600480360381019061034f9190611861565b610fea565b005b610370600480360381019061036b91906119f1565b61107a565b005b60066020528060005260406000206000915090508060000154908060010154908060020154908060050154905084565b6000620151806002546103b59190611a4d565b905090565b60008060008060006006600089815260200190815260200160002060030187876040516103e8929190611ae6565b908152602001604051809103902060030180548060200260200160405190810160405280929190818152602001828054801561047957602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161042f575b5050505050905060005b81518110156105f55760008282815181106104a1576104a0611aff565b5b602002602001015190506000600660008c81526020019081526020016000206003018a8a6040516104d3929190611ae6565b908152602001604051809103902060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff1690506000600660008d81526020019081526020016000206003018b8b60405161055c929190611ae6565b908152602001604051809103902060040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015490506001151582151514156105d05780876105c99190611b2e565b96506105df565b80866105dc9190611b2e565b95505b50505080806105ed90611b84565b915050610483565b50828294509450505050935093915050565b60006201518060015461061a9190611a4d565b905090565b600060066000838152602001908152602001600020600101549050919050565b6000600660008381526020019081526020016000206001015442101561066857600090506106f7565b60006006600084815260200190815260200160002060020154141580156106ab5750610692610b5d565b6006600084815260200190815260200160002060020154105b156106b957600390506106f7565b6106c16103a2565b60066000848152602001908152602001600020600101546106e29190611b2e565b4210156106f257600190506106f7565b600290505b919050565b6107046110fe565b6002600381111561071857610717611756565b5b61072360045461063f565b600381111561073557610734611756565b5b14156107895761078882828080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061117c565b5b6000600381111561079d5761079c611756565b5b6107a860045461063f565b60038111156107ba576107b9611756565b5b14806107f357506003808111156107d4576107d3611756565b5b6107df60045461063f565b60038111156107f1576107f0611756565b5b145b610832576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082990611c50565b60405180910390fd5b8181604051610842929190611ca0565b60405180910390206006600060045481526020019081526020016000206003018383604051610872929190611ae6565b90815260200160405180910390206000016040516108909190611dae565b604051809103902014156108d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d090611e11565b60405180910390fd5b60006006600060045481526020019081526020016000206003018383604051610903929190611ae6565b9081526020016040518091039020905082828260000191906109269291906114d0565b50600660006004548152602001908152602001600020600201600081548092919061095090611b84565b91905055507f513ce06ee1eb0010bd9c7642e9e39cbded2d8147b81543fba031de0e669710ba600454848460405161098a93929190611e6f565b60405180910390a1505050565b61099f6110fe565b6003808111156109b2576109b1611756565b5b6109bd60045461063f565b60038111156109cf576109ce611756565b5b14610a0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0690611eed565b60405180910390fd5b6201518081610a1e9190611a4d565b6006600060045481526020019081526020016000206001016000828254610a459190611b2e565b925050819055507fe4307ebd75c11d78bf90149b242bd8495fa7fafb317cec7866f840c6bd6c3ed481604051610a7b919061164d565b60405180910390a150565b610a8e6110fe565b610a986000611220565b565b6000600454905090565b610aac6110fe565b60008111610aef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ae690611f7f565b60405180910390fd5b7f3c3b22cef1385e7e3a7aee7a13e0c406644197372c4c7e697fd1981f1f6e75e760015482604051610b2292919061172d565b60405180910390a18060018190555050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600354905090565b60016003811115610b7b57610b7a611756565b5b610b8660045461063f565b6003811115610b9857610b97611756565b5b14610bd8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bcf90612011565b60405180910390fd5b610be38585856112e4565b15610c23576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1a906120a3565b60405180910390fd5b6000151560066000600454815260200190815260200160002060040160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151415610c9c57610c9b85611376565b5b600080610cf184600560008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461144390919063ffffffff16565b80925081935050506001151582151514610d40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d379061210f565b60405180910390fd5b80600560008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000610d8f8561146b565b905060006006600060045481526020019081526020016000206003018888604051610dbb929190611ae6565b9081526020016040518091039020905060405180606001604052806001151581526020018615158152602001838152508160040160008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff0219169083151502179055506040820151816001015590505080600301899080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f53f1dbe2ceba78487a30e1afcbe7b30375c220ed56c4e9349a4e6fcfbd8280778989898886604051610f1595949392919061213e565b60405180910390a1505050505050505050565b6000610f326103a2565b6006600084815260200190815260200160002060010154610f539190611b2e565b9050919050565b610f626110fe565b60008111610fa5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f9c906121fe565b60405180910390fd5b7f7e3f7f0708a84de9203036abaa450dccc85ad5ff52f78c170f3edb55cf5e882860025482604051610fd892919061172d565b60405180910390a18060028190555050565b610ff26110fe565b60008111611035576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161102c90612290565b60405180910390fd5b7fccb45da8d5717e6c4544694297c4ba5cf151d455c9bb0ed4fc7a38411bc054616003548260405161106892919061172d565b60405180910390a18060038190555050565b6110826110fe565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156110f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110e990612322565b60405180910390fd5b6110fb81611220565b50565b6111066114c8565b73ffffffffffffffffffffffffffffffffffffffff16611124610b34565b73ffffffffffffffffffffffffffffffffffffffff161461117a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111719061238e565b60405180910390fd5b565b80805190602001206004819055506000600660006004548152602001908152602001600020905060045481600001819055506111b6610607565b426111c19190611b2e565b81600101819055506064600660006004548152602001908152602001600020600501819055507fb56c4ba68eb29ddcc0bf30f5d5bc606ce762ee44a794102af39aba1582b784ed604051611214906123d4565b60405180910390a15050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000600660006004548152602001908152602001600020600301838360405161130e929190611ae6565b908152602001604051809103902060040160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1690509392505050565b600160066000600454815260200190815260200160002060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060066000600454815260200190815260200160002060050154600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050565b6000808383111561145a5760008091509150611464565b6001838503915091505b9250929050565b600080600260018461147d9190611b2e565b611487919061241c565b90508291505b818110156114c25780915060028182856114a7919061241c565b6114b19190611b2e565b6114bb919061241c565b905061148d565b50919050565b600033905090565b8280546114dc90611ce8565b90600052602060002090601f0160209004810192826114fe5760008555611545565b82601f1061151757803560ff1916838001178555611545565b82800160010185558215611545579182015b82811115611544578235825591602001919060010190611529565b5b5090506115529190611556565b5090565b5b8082111561156f576000816000905550600101611557565b5090565b600080fd5b600080fd5b6000819050919050565b6115908161157d565b811461159b57600080fd5b50565b6000813590506115ad81611587565b92915050565b6000602082840312156115c9576115c8611573565b5b60006115d78482850161159e565b91505092915050565b6115e98161157d565b82525050565b6000819050919050565b611602816115ef565b82525050565b600060808201905061161d60008301876115e0565b61162a60208301866115f9565b61163760408301856115f9565b61164460608301846115f9565b95945050505050565b600060208201905061166260008301846115f9565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261168d5761168c611668565b5b8235905067ffffffffffffffff8111156116aa576116a961166d565b5b6020830191508360018202830111156116c6576116c5611672565b5b9250929050565b6000806000604084860312156116e6576116e5611573565b5b60006116f48682870161159e565b935050602084013567ffffffffffffffff81111561171557611714611578565b5b61172186828701611677565b92509250509250925092565b600060408201905061174260008301856115f9565b61174f60208301846115f9565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6004811061179657611795611756565b5b50565b60008190506117a782611785565b919050565b60006117b782611799565b9050919050565b6117c7816117ac565b82525050565b60006020820190506117e260008301846117be565b92915050565b600080602083850312156117ff576117fe611573565b5b600083013567ffffffffffffffff81111561181d5761181c611578565b5b61182985828601611677565b92509250509250929050565b61183e816115ef565b811461184957600080fd5b50565b60008135905061185b81611835565b92915050565b60006020828403121561187757611876611573565b5b60006118858482850161184c565b91505092915050565b60006020820190506118a360008301846115e0565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006118d4826118a9565b9050919050565b6118e4816118c9565b82525050565b60006020820190506118ff60008301846118db565b92915050565b61190e816118c9565b811461191957600080fd5b50565b60008135905061192b81611905565b92915050565b60008115159050919050565b61194681611931565b811461195157600080fd5b50565b6000813590506119638161193d565b92915050565b60008060008060006080868803121561198557611984611573565b5b60006119938882890161191c565b955050602086013567ffffffffffffffff8111156119b4576119b3611578565b5b6119c088828901611677565b945094505060406119d38882890161184c565b92505060606119e488828901611954565b9150509295509295909350565b600060208284031215611a0757611a06611573565b5b6000611a158482850161191c565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611a58826115ef565b9150611a63836115ef565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611a9c57611a9b611a1e565b5b828202905092915050565b600081905092915050565b82818337600083830152505050565b6000611acd8385611aa7565b9350611ada838584611ab2565b82840190509392505050565b6000611af3828486611ac1565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000611b39826115ef565b9150611b44836115ef565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611b7957611b78611a1e565b5b828201905092915050565b6000611b8f826115ef565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611bc257611bc1611a1e565b5b600182019050919050565b600082825260208201905092915050565b7f50726f706f73616c20636f6c6c656374696f6e207068617365206e6f7420616360008201527f7469766500000000000000000000000000000000000000000000000000000000602082015250565b6000611c3a602483611bcd565b9150611c4582611bde565b604082019050919050565b60006020820190508181036000830152611c6981611c2d565b9050919050565b600081905092915050565b6000611c878385611c70565b9350611c94838584611ab2565b82840190509392505050565b6000611cad828486611c7b565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611d0057607f821691505b60208210811415611d1457611d13611cb9565b5b50919050565b60008190508160005260206000209050919050565b60008154611d3c81611ce8565b611d468186611c70565b94506001821660008114611d615760018114611d7257611da5565b60ff19831686528186019350611da5565b611d7b85611d1a565b60005b83811015611d9d57815481890152600182019150602081019050611d7e565b838801955050505b50505092915050565b6000611dba8284611d2f565b915081905092915050565b7f50726f706f73616c20616c726561647920696e206578697374656e6365000000600082015250565b6000611dfb601d83611bcd565b9150611e0682611dc5565b602082019050919050565b60006020820190508181036000830152611e2a81611dee565b9050919050565b6000601f19601f8301169050919050565b6000611e4e8385611bcd565b9350611e5b838584611ab2565b611e6483611e31565b840190509392505050565b6000604082019050611e8460008301866115e0565b8181036020830152611e97818486611e42565b9050949350505050565b7f6e6f20657874656e73696f6e206e656564656400000000000000000000000000600082015250565b6000611ed7601383611bcd565b9150611ee282611ea1565b602082019050919050565b60006020820190508181036000830152611f0681611eca565b9050919050565b7f4379636c6553657474696e67733a2070726f706f73696e6720706572696f642060008201527f746f6f206c6f7700000000000000000000000000000000000000000000000000602082015250565b6000611f69602783611bcd565b9150611f7482611f0d565b604082019050919050565b60006020820190508181036000830152611f9881611f5c565b9050919050565b7f766f74696e6720706572696f64206e6f74207965742073746172746564206f7260008201527f2065787069726564000000000000000000000000000000000000000000000000602082015250565b6000611ffb602883611bcd565b915061200682611f9f565b604082019050919050565b6000602082019050818103600083015261202a81611fee565b9050919050565b7f7573657220616c726561647920766f746564206f6e20746869732070726f706f60008201527f73616c0000000000000000000000000000000000000000000000000000000000602082015250565b600061208d602383611bcd565b915061209882612031565b604082019050919050565b600060208201905081810360008301526120bc81612080565b9050919050565b7f6e6f7420656e6f756768206372656469747320617661696c61626c6500000000600082015250565b60006120f9601c83611bcd565b9150612104826120c3565b602082019050919050565b60006020820190508181036000830152612128816120ec565b9050919050565b61213881611931565b82525050565b600060808201905061215360008301886118db565b8181036020830152612166818688611e42565b9050612175604083018561212f565b61218260608301846115f9565b9695505050505050565b7f4379636c6553657474696e67733a20766f74696e6720706572696f6420746f6f60008201527f206c6f7700000000000000000000000000000000000000000000000000000000602082015250565b60006121e8602483611bcd565b91506121f38261218c565b604082019050919050565b60006020820190508181036000830152612217816121db565b9050919050565b7f4379636c6553657474696e67733a2070726f706f73616c207468726573686f6c60008201527f6420746f6f206c6f770000000000000000000000000000000000000000000000602082015250565b600061227a602983611bcd565b91506122858261221e565b604082019050919050565b600060208201905081810360008301526122a98161226d565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061230c602683611bcd565b9150612317826122b0565b604082019050919050565b6000602082019050818103600083015261233b816122ff565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612378602083611bcd565b915061238382612342565b602082019050919050565b600060208201905081810360008301526123a78161236b565b9050919050565b7f6379636c65486173680000000000000000000000000000000000000000000000815250565b60006020820190506123e8600083016123ae565b919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612427826115ef565b9150612432836115ef565b925082612442576124416123ed565b5b82820490509291505056fea2646970667358221220377469d4a97c025e4fb3994f836ddb6376289c10d4a13ac4e9b5de9e78314bae64736f6c63430008090033";

type QuadraticVotingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: QuadraticVotingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class QuadraticVoting__factory extends ContractFactory {
  constructor(...args: QuadraticVotingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    initialProposingPeriod: PromiseOrValue<BigNumberish>,
    initialVotingPeriod: PromiseOrValue<BigNumberish>,
    initialProposalThreshold: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<QuadraticVoting> {
    return super.deploy(
      initialProposingPeriod,
      initialVotingPeriod,
      initialProposalThreshold,
      overrides || {}
    ) as Promise<QuadraticVoting>;
  }
  override getDeployTransaction(
    initialProposingPeriod: PromiseOrValue<BigNumberish>,
    initialVotingPeriod: PromiseOrValue<BigNumberish>,
    initialProposalThreshold: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      initialProposingPeriod,
      initialVotingPeriod,
      initialProposalThreshold,
      overrides || {}
    );
  }
  override attach(address: string): QuadraticVoting {
    return super.attach(address) as QuadraticVoting;
  }
  override connect(signer: Signer): QuadraticVoting__factory {
    return super.connect(signer) as QuadraticVoting__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QuadraticVotingInterface {
    return new utils.Interface(_abi) as QuadraticVotingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QuadraticVoting {
    return new Contract(address, _abi, signerOrProvider) as QuadraticVoting;
  }
}
