import React from "react"
import ProposalListItem from "./ProposalListItem"
import { ProposalProps } from "./ProposalDetailView"
import EmptyListState from "../layout/EmptyStates/EmptyListState"
import useProposals from "../../hooks/proposals/useProposals"


export default function ProposalList() {
  const [proposalsAreLoading, proposalError, proposals] = useProposals()

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
          <ul role="list" className="divide-y divide-gray-200">
            {proposals.map((proposal: ProposalProps) => (
              <ProposalListItem
                key={proposal.id}
                item={proposal}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }
}
