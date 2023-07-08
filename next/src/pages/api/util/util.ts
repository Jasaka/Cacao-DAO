import type { NextApiRequest, NextApiResponse } from 'next'
import { isNotGet, isNotPut } from "../../../lib/util/util"
import { getSession } from "next-auth/react"
import { generateProposalHash } from "../proposals"
import saveProposalToArweave from "../../../lib/web3/arweave"

export default async function utilHandler(req: NextApiRequest, res: NextApiResponse) {
  if (isNotGet(req)) {
    res.status(405).json({ endpoint: "Method not allowed" })
    return
  }
  res.status(405).json({ endpoint: "Method not allowed" })
  return

  const proposals = [
    {
      "title": "Integration of Automatic Contract Execution for Funded Proposals",
      "description": "This proposal aims to add a feature that automatically executes approved proposals using assigned contractors and funds, streamlining the implementation process.",
      "predictedCost": 6000,
      "currentHash": "",
      "id": "99f22d56-f077-400e-a4b5-d54c54601935",
      "arweaveAddress": "",
      "user": {
        "id": "ca7b7495-4a00-4caf-b381-6dd698bc3dbf",
        "walletAddress": "0x256c44A7FE766501381B51e8b5770094c6c6EA26"
      }
    },
    {
      "title": "Implementation of a User-Friendly Signup Process for New Members",
      "description": "This proposal suggests redesigning the signup process to make it more intuitive and easier for new users to join the platform.",
      "predictedCost": 700,
      "currentHash": "",
      "id": "9cb9ec38-f67e-4444-aa5f-84529e528e8a",
      "arweaveAddress": "",
      "user": {
        "id": "320e6f30-d749-41f5-815f-14174ca8b95e",
        "walletAddress": "0x227c44A7FE766501381B51e8b5770094c6c6EA28"
      }
    },
    {
      "title": "Designing a More Intuitive Interface for Submitting and Voting on Proposals",
      "description": "This proposal aims to improve the user experience by creating a more user-friendly interface for submitting and voting on proposals.",
      "predictedCost": 600,
      "currentHash": "",
      "id": "089d8f64-2249-4a6c-89d9-249945c85a67",
      "arweaveAddress": "",
      "user": {
        "id": "4a7aae7e-3668-4d94-a3d7-88f71548fdf2",
        "walletAddress": "0x018c44A7FE766501381B51e8b5770094c6c6EA25"
      }
    },
    {
      "title": "Adding Support for Multiple Ethereum-Based Chains",
      "description": "This proposal suggests expanding the platform to support multiple Ethereum-based chains, increasing its flexibility and reach.",
      "predictedCost": 200,
      "currentHash": "",
      "id": "b292c5bc-dd03-461e-b147-e0b51ef1dcdc",
      "arweaveAddress": "",
      "user": {
        "id": "57b57183-a5c7-405f-a880-3073ac9b5df4",
        "walletAddress": "0x464c44A7FE766501381B51e8b5770094c6c6EA27"
      }
    },
    {
      "title": "Developing a Mobile App for Convenient Access to the Platform",
      "description": "This proposal aims to create a mobile app version of the platform to provide users with convenient access on-the-go.",
      "predictedCost": 5000,
      "currentHash": "",
      "id": "3ab449ee-ebc7-4ab6-b9e8-8a6ba81a6415",
      "arweaveAddress": "",
      "user": {
        "id": "4a7aae7e-3668-4d94-a3d7-88f71548fdf2",
        "walletAddress": "0x018c44A7FE766501381B51e8b5770094c6c6EA25"
      }
    },
    {
      "title": "Introduction of a Moderation System for Proposal Submission and Review",
      "description": "This proposal suggests implementing a moderation system to ensure that submitted proposals meet certain standards and guidelines before being made available for voting.",
      "predictedCost": 2400,
      "currentHash": "",
      "id": "d0af5de7-fb2e-4669-9be1-ce0d78e956d1",
      "arweaveAddress": "",
      "user": {
        "id": "57b57183-a5c7-405f-a880-3073ac9b5df4",
        "walletAddress": "0x464c44A7FE766501381B51e8b5770094c6c6EA27"
      }
    },
    {
      "title": "Enhancing Security Measures to Protect User Funds and Votes",
      "description": "This proposal aims to improve the security of the platform by implementing additional measures to protect user funds and votes from potential threats.",
      "predictedCost": 2800,
      "currentHash": "",
      "id": "b91f247b-4618-4658-93bb-c05b025063a8",
      "arweaveAddress": "",
      "user": {
        "id": "320e6f30-d749-41f5-815f-14174ca8b95e",
        "walletAddress": "0x227c44A7FE766501381B51e8b5770094c6c6EA28"
      }
    },
    {
      "title": "Enabling Customizable Notification Settings for Users",
      "description": "This proposal suggests adding the ability for users to customize their notification settings, allowing them to choose which updates and alerts they receive.",
      "predictedCost": 800,
      "currentHash": "",
      "id": "0dc557ef-7b05-4003-8ab8-0ccb0adec340",
      "arweaveAddress": "",
      "user": {
        "id": "320e6f30-d749-41f5-815f-14174ca8b95e",
        "walletAddress": "0x227c44A7FE766501381B51e8b5770094c6c6EA28"
      }
    },
    {
      "title": "Expanding the Range of Proposal Categories and Tags",
      "description": "This proposal aims to increase the organization and discoverability of proposals by introducing additional categories and tags.",
      "predictedCost": 200,
      "currentHash": "",
      "id": "4bbcf0bc-3aff-4edc-88c8-6612ecff5006",
      "arweaveAddress": "",
      "user": {
        "id": "320e6f30-d749-41f5-815f-14174ca8b95e",
        "walletAddress": "0x227c44A7FE766501381B51e8b5770094c6c6EA28"
      }
    },
    {
      "title": "Implementing a Reputation System for Proposal Submitters",
      "description": "This proposal suggests introducing a reputation system that rewards active and high-quality proposal submitters.",
      "predictedCost": 1500,
      "currentHash": "",
      "id": "e3d13ff2-9dc1-49ca-b3c7-640f90055330",
      "arweaveAddress": "",
      "user": {
        "id": "57b57183-a5c7-405f-a880-3073ac9b5df4",
        "walletAddress": "0x464c44A7FE766501381B51e8b5770094c6c6EA27"
      }
    },
    {
      "title": "Updating the Smart Contract to Support Additional Voting Options",
      "description": "This proposal aims to enhance the voting system by updating the smart contract to support additional voting options.",
      "predictedCost": 1000,
      "currentHash": "",
      "id": "89e73ff0-7b39-4ca1-9ff4-87451ad00a27",
      "arweaveAddress": "",
      "user": {
        "id": "ca7b7495-4a00-4caf-b381-6dd698bc3dbf",
        "walletAddress": "0x256c44A7FE766501381B51e8b5770094c6c6EA26"
      }
    },
    {
      "title": "Introducing a Reward System for Active Community Members",
      "description": "This proposal suggests implementing a reward system to recognize and incentivize active participation in the community.",
      "predictedCost": 1500,
      "currentHash": "",
      "id": "45eaa814-812a-4628-954d-fa0af86b9b4d",
      "arweaveAddress": "",
      "user": {
        "id": "4a7aae7e-3668-4d94-a3d7-88f71548fdf2",
        "walletAddress": "0x018c44A7FE766501381B51e8b5770094c6c6EA25"
      }
    },
    {
      "title": "Adding Multilingual Support for a Global User Base",
      "description": "This proposal aims to make the platform more accessible to a global audience by adding support for multiple languages.",
      "predictedCost": 300,
      "currentHash": "",
      "id": "00293a5c-e5dc-4ba9-b66d-ff56c5114cb4",
      "arweaveAddress": "",
      "user": {
        "id": "ac5519d2-e669-4360-bb09-31e0a8adf724",
        "walletAddress": "0x876c44A7FE766501381B51e8b5770094c6c6EA24"
      }
    },
    {
      "title": "Creating a Knowledge Base and Support System for New Users",
      "description": "This proposal suggests building a knowledge base and support system to help new users get up to speed and troubleshoot any issues they may encounter.",
      "predictedCost": 2000,
      "currentHash": "",
      "id": "11862e01-13c9-49b8-a439-efec1e365b59",
      "arweaveAddress": "",
      "user": {
        "id": "b768a303-044b-4db6-b902-ca5b756c2949",
        "walletAddress": "0x915c44A7FE766501381B51e8b5770094c6c6EA23"
      }
    }
  ]

  for(let i = 0; i < proposals.length; i++) {
    proposals[i].currentHash = generateProposalHash(proposals[i].id, proposals[i].title, proposals[i].description, proposals[i].predictedCost)
    if (false) {
      saveProposalToArweave({
        id: proposals[i].id,
        title: proposals[i].title,
        description: proposals[i].description,
        predictedCost: proposals[i].predictedCost,
        currentHash: proposals[i].currentHash,
        user: {
          id: proposals[i].user!.id,
          walletAddress: proposals[i].user!.walletAddress
        }
      }).then(arweaveResult => {
        proposals[i].arweaveAddress = arweaveResult!.transactionId!
        console.log(arweaveResult)
        console.log("Proposal " + proposals[i].id + " saved to Arweave with transaction ID " + proposals[i].arweaveAddress)
      })
    } else {
      proposals[i].arweaveAddress = "NOT ON ARWEAVE"
    }
      console.log(proposals[i])
    }

  res.status(200).json(proposals)
}