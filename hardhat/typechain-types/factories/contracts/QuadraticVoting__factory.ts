/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  QuadraticVoting,
  QuadraticVotingInterface,
} from "../../contracts/QuadraticVoting";

const _abi = [
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
        internalType: "string",
        name: "votingRoundHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "proposalHash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalNumber",
        type: "uint256",
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
        internalType: "string",
        name: "votingRoundHash",
        type: "string",
      },
    ],
    name: "VotingRoundCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_votingRoundHash",
        type: "string",
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
        internalType: "string",
        name: "_votingRoundHash",
        type: "string",
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
        name: "_votingRoundHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_proposalHash",
        type: "string",
      },
    ],
    name: "createProposal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_votingRoundHash",
        type: "string",
      },
    ],
    name: "createVotingRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_votingRoundHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_additionalTime",
        type: "uint256",
      },
    ],
    name: "extendVotingRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserCredits",
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
        internalType: "string",
        name: "_votingRoundHash",
        type: "string",
      },
    ],
    name: "getVotingRoundExpirationTime",
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
        internalType: "string",
        name: "_votingRoundHash",
        type: "string",
      },
    ],
    name: "getVotingRoundStatus",
    outputs: [
      {
        internalType: "enum QuadraticVoting.VotingRoundStatus",
        name: "",
        type: "uint8",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_votingRoundHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_expirationTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_votingCredits",
        type: "uint256",
      },
    ],
    name: "setRoundToActiveVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_votingRoundHash",
        type: "string",
      },
    ],
    name: "setRoundToEnded",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_votingRoundHash",
        type: "string",
      },
    ],
    name: "setRoundToTally",
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
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "votingRounds",
    outputs: [
      {
        internalType: "string",
        name: "votingRoundHash",
        type: "string",
      },
      {
        internalType: "enum QuadraticVoting.VotingRoundStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "expirationTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "votingCredits",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposalCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5062000032620000266200003860201b60201c565b6200004060201b60201c565b62000104565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b612c6880620001146000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80638da5cb5b11610097578063d5c7e96311610066578063d5c7e96314610275578063d7cea40d14610291578063e0cbc601146102c1578063f2fde38b146102dd576100f5565b80638da5cb5b146101ef578063923f852a1461020d578063a532315614610229578063d274402514610259576100f5565b806366a5f53e116100d357806366a5f53e14610164578063715018a6146101955780637c12a5ca1461019f5780638c1d30ae146101d3576100f5565b80632092cb33146100fa57806338ee4a2c1461011857806365e481e214610134575b600080fd5b6101026102f9565b60405161010f9190611725565b60405180910390f35b610132600480360381019061012d91906117b9565b610340565b005b61014e60048036038101906101499190611806565b6103f5565b60405161015b9190611725565b60405180910390f35b61017e60048036038101906101799190611806565b610698565b60405161018c929190611887565b60405180910390f35b61019d61090c565b005b6101b960048036038101906101b491906119f1565b610920565b6040516101ca959493929190611b30565b60405180910390f35b6101ed60048036038101906101e891906117b9565b610a01565b005b6101f7610b15565b6040516102049190611bcb565b60405180910390f35b61022760048036038101906102229190611c4a565b610b3e565b005b610243600480360381019061023e91906117b9565b610f61565b6040516102509190611725565b60405180910390f35b610273600480360381019061026e9190611cf1565b610f8f565b005b61028f600480360381019061028a9190611d65565b61111b565b005b6102ab60048036038101906102a691906117b9565b611235565b6040516102b89190611dc5565b60405180910390f35b6102db60048036038101906102d691906117b9565b611270565b005b6102f760048036038101906102f29190611e0c565b611338565b005b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b6103486113bb565b60006002838360405161035c929190611e69565b9081526020016040518091039020905060018160010160006101000a81548160ff0219169083600481111561039457610393611ab9565b5b021790555082828260000191826103ac929190612099565b50600081600501819055507fb5b74a176e1995815eaf9ba4afb84a89580140043e4f90c6bcbcb496d46904c283836040516103e8929190612196565b60405180910390a1505050565b60006103ff6113bb565b6001600481111561041357610412611ab9565b5b61041d8686611235565b600481111561042f5761042e611ab9565b5b1461046f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046690612252565b60405180910390fd5b828260405161047f9291906122a2565b604051809103902060028686604051610499929190611e69565b908152602001604051809103902060040184846040516104ba929190611e69565b90815260200160405180910390206003016040516104d89190612353565b604051809103902003610520576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610517906123b6565b60405180910390fd5b828260028787604051610534929190611e69565b9081526020016040518091039020600601600060028989604051610559929190611e69565b90815260200160405180910390206005015481526020019081526020016000209182610586929190612099565b5060028585604051610599929190611e69565b908152602001604051809103902060050160008154809291906105bb90612405565b91905055506000600286866040516105d4929190611e69565b908152602001604051809103902060040184846040516105f5929190611e69565b9081526020016040518091039020905060028686604051610617929190611e69565b90815260200160405180910390206005015481600001819055508383826003019182610644929190612099565b507f7b1cffcced3d3750ea9524d46fbc04c44025ce41ea889c22f1a85f158f7ba0cb86868686856000015460405161068095949392919061244d565b60405180910390a18060000154915050949350505050565b6000806000806000600289896040516106b2929190611e69565b908152602001604051809103902060040187876040516106d3929190611e69565b908152602001604051809103902060040180548060200260200160405190810160405280929190818152602001828054801561076457602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161071a575b5050505050905060005b81518110156108f957600082828151811061078c5761078b612496565b5b60200260200101519050600060028c8c6040516107aa929190611e69565b90815260200160405180910390206004018a8a6040516107cb929190611e69565b908152602001604051809103902060050160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff169050600060028d8d604051610840929190611e69565b90815260200160405180910390206004018b8b604051610861929190611e69565b908152602001604051809103902060050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154905060011515821515036108d45780876108cd91906124c5565b96506108e3565b80866108e091906124c5565b95505b50505080806108f190612405565b91505061076e565b5082829450945050505094509492505050565b6109146113bb565b61091e6000611439565b565b60028180516020810182018051848252602083016020850120818352809550505050505060009150905080600001805461095990611ebc565b80601f016020809104026020016040519081016040528092919081815260200182805461098590611ebc565b80156109d25780601f106109a7576101008083540402835291602001916109d2565b820191906000526020600020905b8154815290600101906020018083116109b557829003601f168201915b5050505050908060010160009054906101000a900460ff16908060020154908060030154908060050154905085565b610a096113bb565b60026004811115610a1d57610a1c611ab9565b5b610a278383611235565b6004811115610a3957610a38611ab9565b5b14610a79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7090612545565b60405180910390fd5b610a838282610f61565b421015610ac5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610abc906125b1565b60405180910390fd5b600360028383604051610ad9929190611e69565b908152602001604051809103902060010160006101000a81548160ff02191690836004811115610b0c57610b0b611ab9565b5b02179055505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60026004811115610b5257610b51611ab9565b5b610b5c8787611235565b6004811115610b6e57610b6d611ab9565b5b14610bae576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba590612643565b60405180910390fd5b42610bb98787610f61565b11610bf9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bf0906126d5565b60405180910390fd5b610c05868686866114fd565b15610c45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3c90612767565b60405180910390fd5b6000151560028787604051610c5b929190611e69565b908152602001604051809103902060070160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151503610cc957610cc8868661159b565b5b600080610d1e84600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461167f90919063ffffffff16565b80925081935050506001151582151514610d6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d64906127d3565b60405180910390fd5b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000610dbc856116a7565b9050600060028a8a604051610dd2929190611e69565b90815260200160405180910390206004018888604051610df3929190611e69565b9081526020016040518091039020905060405180606001604052806001151581526020018615158152602001838152508160050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff02191690831515021790555060208201518160000160016101000a81548160ff0219169083151502179055506040820151816001015590505080600401339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f53f1dbe2ceba78487a30e1afcbe7b30375c220ed56c4e9349a4e6fcfbd828077338b8b8886604051610f4d959493929190612802565b60405180910390a150505050505050505050565b600060028383604051610f75929190611e69565b908152602001604051809103902060020154905092915050565b610f976113bb565b60008211610fda576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fd19061289c565b60405180910390fd5b6000811161101d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161101490612908565b60405180910390fd5b6001600481111561103157611030611ab9565b5b61103b8585611235565b600481111561104d5761104c611ab9565b5b1461105757600080fd5b806002858560405161106a929190611e69565b908152602001604051809103902060030181905550600182603c61108e9190612928565b6110989190612928565b426110a391906124c5565b600285856040516110b5929190611e69565b90815260200160405180910390206002018190555060028085856040516110dd929190611e69565b908152602001604051809103902060010160006101000a81548160ff021916908360048111156111105761110f611ab9565b5b021790555050505050565b6111236113bb565b6002600481111561113757611136611ab9565b5b6111418484611235565b600481111561115357611152611ab9565b5b14611193576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118a906129dc565b60405180910390fd5b4261119e8484610f61565b116111de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111d590612a48565b60405180910390fd5b600181603c6111ed9190612928565b6111f79190612928565b60028484604051611209929190611e69565b9081526020016040518091039020600201600082825461122991906124c5565b92505081905550505050565b600060028383604051611249929190611e69565b908152602001604051809103902060010160009054906101000a900460ff16905092915050565b6112786113bb565b6003600481111561128c5761128b611ab9565b5b6112968383611235565b60048111156112a8576112a7611ab9565b5b146112e8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112df90612ab4565b60405180910390fd5b6004600283836040516112fc929190611e69565b908152602001604051809103902060010160006101000a81548160ff0219169083600481111561132f5761132e611ab9565b5b02179055505050565b6113406113bb565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036113af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113a690612b46565b60405180910390fd5b6113b881611439565b50565b6113c3611704565b73ffffffffffffffffffffffffffffffffffffffff166113e1610b15565b73ffffffffffffffffffffffffffffffffffffffff1614611437576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161142e90612bb2565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600060028585604051611511929190611e69565b90815260200160405180910390206004018383604051611532929190611e69565b908152602001604051809103902060050160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff169050949350505050565b600282826040516115ad929190611e69565b908152602001604051809103902060030154600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600160028383604051611616929190611e69565b908152602001604051809103902060070160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6000808383111561169657600080915091506116a0565b6001838503915091505b9250929050565b60008060026001846116b991906124c5565b6116c39190612c01565b90508291505b818110156116fe5780915060028182856116e39190612c01565b6116ed91906124c5565b6116f79190612c01565b90506116c9565b50919050565b600033905090565b6000819050919050565b61171f8161170c565b82525050565b600060208201905061173a6000830184611716565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f84011261177957611778611754565b5b8235905067ffffffffffffffff81111561179657611795611759565b5b6020830191508360018202830111156117b2576117b161175e565b5b9250929050565b600080602083850312156117d0576117cf61174a565b5b600083013567ffffffffffffffff8111156117ee576117ed61174f565b5b6117fa85828601611763565b92509250509250929050565b600080600080604085870312156118205761181f61174a565b5b600085013567ffffffffffffffff81111561183e5761183d61174f565b5b61184a87828801611763565b9450945050602085013567ffffffffffffffff81111561186d5761186c61174f565b5b61187987828801611763565b925092505092959194509250565b600060408201905061189c6000830185611716565b6118a96020830184611716565b9392505050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6118fe826118b5565b810181811067ffffffffffffffff8211171561191d5761191c6118c6565b5b80604052505050565b6000611930611740565b905061193c82826118f5565b919050565b600067ffffffffffffffff82111561195c5761195b6118c6565b5b611965826118b5565b9050602081019050919050565b82818337600083830152505050565b600061199461198f84611941565b611926565b9050828152602081018484840111156119b0576119af6118b0565b5b6119bb848285611972565b509392505050565b600082601f8301126119d8576119d7611754565b5b81356119e8848260208601611981565b91505092915050565b600060208284031215611a0757611a0661174a565b5b600082013567ffffffffffffffff811115611a2557611a2461174f565b5b611a31848285016119c3565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611a74578082015181840152602081019050611a59565b60008484015250505050565b6000611a8b82611a3a565b611a958185611a45565b9350611aa5818560208601611a56565b611aae816118b5565b840191505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60058110611af957611af8611ab9565b5b50565b6000819050611b0a82611ae8565b919050565b6000611b1a82611afc565b9050919050565b611b2a81611b0f565b82525050565b600060a0820190508181036000830152611b4a8188611a80565b9050611b596020830187611b21565b611b666040830186611716565b611b736060830185611716565b611b806080830184611716565b9695505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611bb582611b8a565b9050919050565b611bc581611baa565b82525050565b6000602082019050611be06000830184611bbc565b92915050565b611bef8161170c565b8114611bfa57600080fd5b50565b600081359050611c0c81611be6565b92915050565b60008115159050919050565b611c2781611c12565b8114611c3257600080fd5b50565b600081359050611c4481611c1e565b92915050565b60008060008060008060808789031215611c6757611c6661174a565b5b600087013567ffffffffffffffff811115611c8557611c8461174f565b5b611c9189828a01611763565b9650965050602087013567ffffffffffffffff811115611cb457611cb361174f565b5b611cc089828a01611763565b94509450506040611cd389828a01611bfd565b9250506060611ce489828a01611c35565b9150509295509295509295565b60008060008060608587031215611d0b57611d0a61174a565b5b600085013567ffffffffffffffff811115611d2957611d2861174f565b5b611d3587828801611763565b94509450506020611d4887828801611bfd565b9250506040611d5987828801611bfd565b91505092959194509250565b600080600060408486031215611d7e57611d7d61174a565b5b600084013567ffffffffffffffff811115611d9c57611d9b61174f565b5b611da886828701611763565b93509350506020611dbb86828701611bfd565b9150509250925092565b6000602082019050611dda6000830184611b21565b92915050565b611de981611baa565b8114611df457600080fd5b50565b600081359050611e0681611de0565b92915050565b600060208284031215611e2257611e2161174a565b5b6000611e3084828501611df7565b91505092915050565b600081905092915050565b6000611e508385611e39565b9350611e5d838584611972565b82840190509392505050565b6000611e76828486611e44565b91508190509392505050565b600082905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611ed457607f821691505b602082108103611ee757611ee6611e8d565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302611f4f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611f12565b611f598683611f12565b95508019841693508086168417925050509392505050565b6000819050919050565b6000611f96611f91611f8c8461170c565b611f71565b61170c565b9050919050565b6000819050919050565b611fb083611f7b565b611fc4611fbc82611f9d565b848454611f1f565b825550505050565b600090565b611fd9611fcc565b611fe4818484611fa7565b505050565b5b8181101561200857611ffd600082611fd1565b600181019050611fea565b5050565b601f82111561204d5761201e81611eed565b61202784611f02565b81016020851015612036578190505b61204a61204285611f02565b830182611fe9565b50505b505050565b600082821c905092915050565b600061207060001984600802612052565b1980831691505092915050565b6000612089838361205f565b9150826002028217905092915050565b6120a38383611e82565b67ffffffffffffffff8111156120bc576120bb6118c6565b5b6120c68254611ebc565b6120d182828561200c565b6000601f83116001811461210057600084156120ee578287013590505b6120f8858261207d565b865550612160565b601f19841661210e86611eed565b60005b8281101561213657848901358255600182019150602085019450602081019050612111565b86831015612153578489013561214f601f89168261205f565b8355505b6001600288020188555050505b50505050505050565b60006121758385611a45565b9350612182838584611972565b61218b836118b5565b840190509392505050565b600060208201905081810360008301526121b1818486612169565b90509392505050565b7f50726f706f73616c20636f6c6c656374696f6e2070686173652068617320626560008201527f656e20636c6f736564206f7220776173206e6f742079657420696e697469617460208201527f6564000000000000000000000000000000000000000000000000000000000000604082015250565b600061223c604283611a45565b9150612247826121ba565b606082019050919050565b6000602082019050818103600083015261226b8161222f565b9050919050565b600081905092915050565b60006122898385612272565b9350612296838584611972565b82840190509392505050565b60006122af82848661227d565b91508190509392505050565b60008190508160005260206000209050919050565b600081546122dd81611ebc565b6122e78186612272565b9450600182166000811461230257600181146123175761234a565b60ff198316865281151582028601935061234a565b612320856122bb565b60005b8381101561234257815481890152600182019150602081019050612323565b838801955050505b50505092915050565b600061235f82846122d0565b915081905092915050565b7f50726f706f73616c20616c726561647920696e206578697374656e6365000000600082015250565b60006123a0601d83611a45565b91506123ab8261236a565b602082019050919050565b600060208201905081810360008301526123cf81612393565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006124108261170c565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612442576124416123d6565b5b600182019050919050565b60006060820190508181036000830152612468818789612169565b9050818103602083015261247d818587612169565b905061248c6040830184611716565b9695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006124d08261170c565b91506124db8361170c565b92508282019050808211156124f3576124f26123d6565b5b92915050565b7f566f7465206973206e6f7420696e2070726f6772657373000000000000000000600082015250565b600061252f601783611a45565b915061253a826124f9565b602082019050919050565b6000602082019050818103600083015261255e81612522565b9050919050565b7f766f74696e6720706572696f6420686173206e6f742065787069726564000000600082015250565b600061259b601d83611a45565b91506125a682612565565b602082019050919050565b600060208201905081810360008301526125ca8161258e565b9050919050565b7f70726f706f73616c206e6f74207965742073746172746564206f72206578706960008201527f7265640000000000000000000000000000000000000000000000000000000000602082015250565b600061262d602383611a45565b9150612638826125d1565b604082019050919050565b6000602082019050818103600083015261265c81612620565b9050919050565b7f766f74696e672074696d65206578706972656420666f7220746869732070726f60008201527f706f73616c000000000000000000000000000000000000000000000000000000602082015250565b60006126bf602583611a45565b91506126ca82612663565b604082019050919050565b600060208201905081810360008301526126ee816126b2565b9050919050565b7f7573657220616c726561647920766f746564206f6e20746869732070726f706f60008201527f73616c0000000000000000000000000000000000000000000000000000000000602082015250565b6000612751602383611a45565b915061275c826126f5565b604082019050919050565b6000602082019050818103600083015261278081612744565b9050919050565b7f6e6f7420656e6f756768206372656469747320617661696c61626c6500000000600082015250565b60006127bd601c83611a45565b91506127c882612787565b602082019050919050565b600060208201905081810360008301526127ec816127b0565b9050919050565b6127fc81611c12565b82525050565b60006080820190506128176000830188611bbc565b818103602083015261282a818688612169565b905061283960408301856127f3565b6128466060830184611716565b9695505050505050565b7f566f74696e6720706572696f642063616e6e6f74206265203000000000000000600082015250565b6000612886601983611a45565b915061289182612850565b602082019050919050565b600060208201905081810360008301526128b581612879565b9050919050565b7f566f74696e6720637265646974732063616e6e6f742062652030000000000000600082015250565b60006128f2601a83611a45565b91506128fd826128bc565b602082019050919050565b60006020820190508181036000830152612921816128e5565b9050919050565b60006129338261170c565b915061293e8361170c565b925082820261294c8161170c565b91508282048414831517612963576129626123d6565b5b5092915050565b7f70726f706f73616c20686173206e6f74207965742073746172746564206f722060008201527f6578706972656400000000000000000000000000000000000000000000000000602082015250565b60006129c6602783611a45565b91506129d18261296a565b604082019050919050565b600060208201905081810360008301526129f5816129b9565b9050919050565b7f766f74696e672074696d6520616c726561647920657870697265640000000000600082015250565b6000612a32601b83611a45565b9150612a3d826129fc565b602082019050919050565b60006020820190508181036000830152612a6181612a25565b9050919050565b7f50726f706f73616c2073686f756c6420626520696e2074616c6c790000000000600082015250565b6000612a9e601b83611a45565b9150612aa982612a68565b602082019050919050565b60006020820190508181036000830152612acd81612a91565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612b30602683611a45565b9150612b3b82612ad4565b604082019050919050565b60006020820190508181036000830152612b5f81612b23565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612b9c602083611a45565b9150612ba782612b66565b602082019050919050565b60006020820190508181036000830152612bcb81612b8f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612c0c8261170c565b9150612c178361170c565b925082612c2757612c26612bd2565b5b82820490509291505056fea26469706673582212208c546bca867aa916cf03374e2c0f05dbee0721bb3590a4319bb47ff294ffde9064736f6c63430008110033";

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
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<QuadraticVoting> {
    return super.deploy(overrides || {}) as Promise<QuadraticVoting>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
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
