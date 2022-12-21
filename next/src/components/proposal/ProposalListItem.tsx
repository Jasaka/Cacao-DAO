import React from "react"
import { HashtagIcon } from "@heroicons/react/solid"
import Link from "next/link"

interface ProposalListItemProps {
  proposal: {
    id: string;
    title: string;
    predictedCost: number | null;
    upVotes: number;
    downVotes: number;
    currentHash: string;
    authorName: string;
  };
}

export default function ProposalListItem(props: ProposalListItemProps) {
  const { proposal } = props

  const fullVoteAmount: number = proposal.upVotes + proposal.downVotes
  const upVotePercentage: number = proposal.upVotes / fullVoteAmount

  let leftSize = 0
  let rightSize = 0

  leftSize = Math.ceil(40 * upVotePercentage)
  rightSize = 40 - leftSize
  if (leftSize === 40 && upVotePercentage < 1) {
    leftSize = 39
    rightSize = 1
  }

  const variableWidthStyle = (part: number) => {
    return {
      width: `${part * 0.25}rem`
    }
  }

  const renderVoteRatio = () => {
    if (fullVoteAmount === 0) {
      return (
        <div className={`mt-2 w-40 h-1 rounded`}>
          <div className={`h-1 w-40 bg-gray-200`} />
        </div>
      )
    } else if (leftSize <= 0 || typeof leftSize === "undefined") {
      return (
        <div className={`mt-2 w-40 h-1 rounded`}>
          <div className={`h-1 w-40 bg-red-500`} />
        </div>
      )
    } else {
      return (
        <div className={`mt-2 w-40 h-1 rounded`}>
          <div
            style={variableWidthStyle(leftSize)}
            className={`h-1 bg-lime-500 inline-flex`}
          />
          <div
            style={variableWidthStyle(rightSize)}
            className={`h-1 bg-orange-500 inline-flex`}
          />
        </div>
      )
    }
  }

  return (
    <tr key={proposal.id}>
      <Link key={proposal.id} href={`/proposals/${proposal.id}`}>
        <a className="block hover:bg-gray-50">
          <td
            className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
            {proposal.title}
            <dl className="font-normal lg:hidden">
              <dt className="sr-only">Title</dt>
              <dd className="mt-1 truncate text-gray-700">{proposal.currentHash}</dd>
              <dt className="sr-only sm:hidden">Email</dt>
              <dd className="mt-1 truncate text-gray-500 sm:hidden">{proposal.email}</dd>
            </dl>
          </td>
          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{proposal.title}</td>
          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{proposal.email}</td>
          <td className="px-3 py-4 text-sm text-gray-500">{proposal.role}</td>
        </a>
      </Link>
    </tr>
  )
}
