import React from "react"
import EmptyListState from "../layout/EmptyStates/EmptyListState"
import useProposals from "../../hooks/proposals/useProposals"
import { UserAvatarWithPopover } from "../user/UserAvatarWithPopover"
import { useRouter } from "next/router"
import LoadingSpinner from "../base/LoadingStates/LoadingSpinner"
import { classNames } from "../../util/classNames"

interface ProposalListProps {
  proposals: any[]
  heading?: string
  colorCoded?: boolean
}

export default function ProposalList({ proposals, heading, colorCoded }: ProposalListProps) {
  const router = useRouter()

  return (
    <>
      {heading ? <h2 className="text-lg font-medium text-gray-900 mb-4">{heading}</h2> : null}
      <table
        className="overflow-hidden min-w-full divide-y divide-x divide-gray-300 shadow ring-1 ring-black ring-opacity-5 mb-8">
        <TableHead />
        <tbody className="bg-white divide-y divide-gray-200">
        {proposals.map((proposal: any, index: any) => {
          let popoverPosition: "bottom" | "top" = "bottom"
          if (index >= proposals.length / 2) {
            popoverPosition = "top"
          }

          return (
            <tr className={colorCoded ? classNames(proposal.status === "1" ? "bg-yellow-100" : "bg-lime-100", "cursor-pointer hover:bg-gray-200") : "cursor-pointer hover:bg-gray-200"} key={proposal.id}
                onClick={() => router.push("/proposals/" + proposal.id)}>
              <td className="text-left font-semibold py-4 pl-4">
                <span className="hidden md:table-cell">{proposal.title}</span>
                <dl className="flex flex-col md:hidden">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-base font-semibold text-gray-900">{proposal.title}</dd>
                  <dt className="sr-only">Description</dt>
                  <dd className="text-sm text-gray-500">{proposal.description}</dd>
                  <dt className="sr-only sm:hidden">Est. Cost</dt>
                  <dd className="text-sm text-gray-500 sm:hidden pt-4">Est. Cost: {proposal.predictedCost} €</dd>
                </dl>
              </td>
              <td className="text-left hidden md:table-cell">{proposal.description}</td>
              <td className={"w-32 text-center hidden sm:table-cell"}>{proposal.predictedCost} €</td>
              <td align="center" valign="middle" className={"w-32"}>
                <div className="hidden sm:inline">
                  <UserAvatarWithPopover userId={proposal.authorId}
                                         avatarSize={"sm"} type={popoverPosition} />
                </div>
                <div className="sm:hidden">
                  <UserAvatarWithPopover userId={proposal.authorId}
                                         avatarSize={"sm"} type={"no"} />
                </div>
              </td>
            </tr>)
        })}
        </tbody>
      </table>
    </>
  )
}

const TableHead = () => {
  return (
    <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="text-left py-4 pl-4"><span className={"hidden md:table-cell"}>Title</span><span
        className={"md:hidden"}>Proposal</span></th>
      <th scope="col" className="text-left hidden md:table-cell">Description</th>
      <th scope="col" className="text-center hidden sm:table-cell">Est. Cost</th>
      <th scope="col" className="text-center">Submission</th>
    </tr>
    </thead>
  )
}
