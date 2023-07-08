import React from "react"
import Link from "next/link"
import { UserAvatarWithPopover } from "../user/UserAvatarWithPopover"

interface ProposalListItemProps {
  proposal: {
    id: string;
    title: string;
    description: string;
    predictedCost: number | null;
    upVotes: number;
    downVotes: number;
    currentHash: string;
    author: {
      userId: string;
    }
  };
}

export default function ProposalListItem(props: ProposalListItemProps) {
  const { proposal } = props


  return (
    <Link key={proposal.id} href={`/proposals/${proposal.id}`}>
      <a className="block hover:bg-gray-50">
        <tr key={proposal.id}>
          <td
            className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
            {proposal.title}
            <dl className="font-normal lg:hidden">
              <dt className="sr-only sm:hidden">Estimated Cost</dt>
              <dd className="mt-1 truncate text-gray-500 sm:hidden">{proposal.predictedCost}</dd>
              <dt className="sr-only">Description</dt>
              <dd className="mt-1 truncate text-gray-700">{proposal.description}</dd>
            </dl>
          </td>
          <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{proposal.description}</td>
          <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{proposal.predictedCost}</td>
          <td className="text-sm text-gray-500 z-10"><UserAvatarWithPopover avatarSize={"sm"}
                                                                            userId={proposal.author.userId} /></td>
        </tr>
      </a>
    </Link>
  )
}
