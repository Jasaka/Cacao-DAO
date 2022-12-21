import React from "react"
import ProposalListItem from "./ProposalListItem"
import { ProposalProps } from "./ProposalDetailView"
import EmptyListState from "../layout/EmptyStates/EmptyListState"
import useProposals from "../../hooks/proposals/useProposals"

const proposalList = [
  {
    "id": "proposal-1",
    "title": "New User Interface for the Platform",
    "description": "A proposal to overhaul the current user interface for the platform, to make it more user-friendly and intuitive for users to navigate and use.",
    "currentHash": "0x1234567890",
    "predictedCost": 10000,
    "author": {
      "userId": "user-1",
      "walletId": "0xabcdefghij",
      "name": "John Smith",
      "imageUrl": "https://example.com/john-smith.jpg",
      "isAdmin": false,
      "email": "john@example.com",
      "about": "I am a software developer and user experience designer."
    },
    "status": "pending",
    "cycle": "cycle-1",
    "upvotes": 50,
    "downvotes": 20
  },{
    "id": "proposal-2",
    "title": "Tracking Proposal Status",
    "description": "A proposal to add a feature to the platform that allows users to see the current status of a proposal, including whether it is being considered, voted on, or implemented.",
    "currentHash": "0x2345678901",
    "predictedCost": 5000,
    "author": {
      "userId": "user-2",
      "walletId": "0xbcdefghijk",
      "name": "Jane Doe",
      "imageUrl": "https://example.com/jane-doe.jpg",
      "isAdmin": false,
      "email": "jane@example.com",
      "about": "I am a project manager and community organizer."
    },
    "status": "pending",
    "cycle": "cycle-2",
    "upvotes": 30,
    "downvotes": 10
  },{
    "id": "proposal-3",
    "title": "Multiple Language Support",
    "description": "A proposal to add support for multiple languages to the platform, allowing users to use it in their preferred language.",
    "currentHash": "0x3456789012",
    "predictedCost": 8000,
    "author": {
      "userId": "user-3",
      "walletId": "0xcdefghijkl",
      "name": "Jack Williams",
      "imageUrl": "https://example.com/jack-williams.jpg",
      "isAdmin": false,
      "email": "jack@example.com",
      "about": "I am a translator and language specialist."
    },
    "status": "pending",
    "cycle": "cycle-3",
    "upvotes": 40,
    "downvotes": 15
  },
  {
    "id": "proposal-4",
    "title": "Dispute Resolution System",
    "description": "A proposal to create a system for resolving disputes that may arise over proposals, such as disputes over the interpretation of the proposal or its potential impact.",
    "currentHash": "0x4567890123",
    "predictedCost": 9000,
    "author": {
      "userId": "user-4",
      "walletId": "0xdefghijklm",
      "name": "Emily Johnson",
      "imageUrl": "https://example.com/emily-johnson.jpg",
      "isAdmin": false,
      "email": "emily@example.com",
      "about": "I am a lawyer and dispute resolution specialist."
    },
    "status": "pending",
    "cycle": "cycle-4",
    "upvotes": 35,
    "downvotes": 12
  },{
    "id": "proposal-5",
    "title": "Smart Contract Security Update",
    "description": "A proposal to update the platform's smart contracts to address any potential security vulnerabilities or weaknesses.",
    "currentHash": "0x5678901234",
    "predictedCost": 7000,
    "author": {
      "userId": "user-5",
      "walletId": "0xefghijklmn",
      "name": "David Brown",
      "imageUrl": "https://example.com/david-brown.jpg",
      "isAdmin": false,
      "email": "david@example.com",
      "about": "I am a security engineer and blockchain developer."
    },
    "status": "pending",
    "cycle": "cycle-5",
    "upvotes": 45,
    "downvotes": 18
  },{
    "id": "proposal-6",
    "title": "Support for New Blockchain Technologies",
    "description": "A proposal to add support for new blockchain technologies to the platform, such as Ethereum 2.0 or Binance Smart Chain.",
    "currentHash": "0x6789012345",
    "predictedCost": 12000,
    "author": {
      "userId": "user-6",
      "walletId": "0xfghijklmno",
      "name": "Samantha Kim",
      "imageUrl": "https://example.com/samantha-kim.jpg",
      "isAdmin": false,
      "email": "samantha@example.com",
      "about": "I am a blockchain researcher and developer."
    },
    "status": "pending",
    "cycle": "cycle-6",
    "upvotes": 60,
    "downvotes": 25
  },{
    "id": "proposal-7",
    "title": "Proposal Funding Tracking",
    "description": "A proposal to add a feature to the platform that allows users to see how much funding a proposal has received, and from whom.",
    "currentHash": "0x7890123456",
    "predictedCost": 8000,
    "author": {
      "userId": "user-7",
      "walletId": "0xghijklmnop",
      "name": "Michael Davis",
      "imageUrl": "https://example.com/michael-davis.jpg",
      "isAdmin": false,
      "email": "michael@example.com",
      "about": "I am a finance and business analyst."
    },
    "status": "pending",
    "cycle": "cycle-7",
    "upvotes": 50,
    "downvotes": 20
  },{
    "id": "proposal-8",
    "title": "Updated Terms of Service",
    "description": "A proposal to update the platform's terms of service to reflect any changes in the platform's policies or legal requirements.",
    "currentHash": "0x8901234567",
    "predictedCost": 5000,
    "author": {
      "userId": "user-8",
      "walletId": "0xhijklmnopq",
      "name": "Jessica Thompson",
      "imageUrl": "https://example.com/jessica-thompson.jpg",
      "isAdmin": false,
      "email": "jessica@example.com",
      "about": "I am a lawyer and legal researcher."
    },
    "status": "pending",
    "cycle": "cycle-8",
    "upvotes": 30,
    "downvotes": 10
  },
  {
    "id": "proposal-9",
    "title": "New Voting System for Proposal Selection",
    "description": "A proposal to introduce a new voting system for selecting which proposals will be considered on the platform, such as a ranked choice voting system.",
    "currentHash": "0x9012345678",
    "predictedCost": 9000,
    "author": {
      "userId": "user-9",
      "walletId": "0xijklmnopqr",
      "name": "Robert Smith",
      "imageUrl": "https://example.com/robert-smith.jpg",
      "isAdmin": false,
      "email": "robert@example.com",
      "about": "I am a voting systems researcher and data scientist."
    },
    "status": "pending",
    "cycle": "cycle-9",
    "upvotes": 35,
    "downvotes": 12
  }
]

export default function ProposalList() {
  const [proposalsAreLoading, proposalError, proposals] = [false, false, proposalList]
  console.log(proposals)

  if (proposalsAreLoading || !proposals || (proposals && proposals.length === 0)) {
    return (
      <EmptyListState
        icon={"document"}
        text={"Add a new proposal to fill this list"}
      />
    )
  } else if (proposalError) {
    return (
      <EmptyListState
        icon={"document"}
        text={"There was an error loading the proposals"}
      />
    )
  } else {
    return (
      <>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Title
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >

                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >

                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">

                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
              {proposals.map((proposal: any) => (
                <ProposalListItem
                  key={proposal.id}
                  proposal={proposal}
                />
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}
