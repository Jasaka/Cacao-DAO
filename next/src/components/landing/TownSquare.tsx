import React from "react"
import useProposals from "../../hooks/proposals/useProposals"
import { useSession } from "next-auth/react"
import ProposalList from "../proposal/ProposalList"
import useCurrentCycle from "../../hooks/cycle/useCycle"
import EmptyListState from "../layout/EmptyStates/EmptyListState"

export default function TownSquare() {
  const { data: session, status } = useSession()
  const [proposalsAreLoading, proposalsError, proposals] = useProposals()
  const [currentCycleIsLoading, , currentCycle] = useCurrentCycle()

  if (proposalsAreLoading || status === "loading" || currentCycleIsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        Loading...
      </div>
    )
  } else if (proposalsError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        Error loading proposals
      </div>
    )
  }

  const currentUserProposals = proposals.filter((proposal: any) => proposal.authorId === session?.user.id && proposal.cycleId === currentCycle.cycleId)
  const previousUserProposals = proposals.filter((proposal: any) => proposal.authorId === session?.user.id && proposal.cycleId !== currentCycle.cycleId)

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {currentUserProposals.length > 0 ?
        <ProposalList proposals={currentUserProposals} heading={"Your current proposals"} colorCoded /> : <EmptyListState
          icon={"document"}
          text={"Add a new proposal to fill this list"}
        />}
      {previousUserProposals.length > 0 ?
        <ProposalList proposals={previousUserProposals} heading={"Your previous proposals"} /> : <EmptyListState
          icon={"document"}
          text={"Add a new proposal to fill this list"}
        />}
    </div>
  )
}