import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import ProposalList from "../components/proposal/ProposalList"
import useCurrentCycle from "../hooks/cycle/useCycle"
import useProposals from "../hooks/proposals/useProposals"
import EmptyListState from "../components/layout/EmptyStates/EmptyListState"
import React from "react"

const Proposals: NextPage = () => {
  const [currentCycleLoading, , currentCycle] = useCurrentCycle()
  const [proposalsAreLoading, proposalError, proposals] = useProposals()

  if (proposalsAreLoading || currentCycleLoading) {
    return (<div>Loading...</div>)
  } else if (proposalError) {
    return (<div>There was an error loading the proposals</div>)
  }

  if (proposals.length === 0 || !proposals) {
    if (proposalsAreLoading || !proposals || (proposals && proposals.length === 0)) {
      return (
        <EmptyListState
          icon={"document"}
          text={"Add a new proposal to fill this list"}
        />
      )
    }
  }

  const currentProposals = proposals.filter((proposal: any) => proposal.cycleId === currentCycle.cycleId)
  const pastProposals = proposals.filter((proposal: any) => proposal.cycleId !== currentCycle.cycleId)

  const proposalEndDate = new Date(currentCycle.proposingEndDate.replace(' ', 'T'))

  return (
    <Layout pageTitle={"dOrg Proposals"} pageHeading={"Proposals"}
            actionButton={currentCycle.status === "0" ? {
              label: "New Proposal",
              target: "/proposals/new"
            } : undefined}>
      <ProposalList heading={currentCycle.status === "0" ? "Current Proposals - Submissions open until " + proposalEndDate.toLocaleDateString() : "Current Proposals - Submissions Closed"} proposals={currentProposals} colorCoded />
      <ProposalList heading={"Past Proposals"} proposals={pastProposals} />
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/util/serverProps"
export default Proposals
