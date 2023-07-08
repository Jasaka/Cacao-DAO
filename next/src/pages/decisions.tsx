import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import EmptyStateWithRecommendation from "../components/layout/EmptyStates/EmptyStateWithRecommendation"
import useCurrentCycle from "../hooks/cycle/useCycle"
import useProposals from "../hooks/proposals/useProposals"
import ProposalList from "../components/proposal/ProposalList"

const Decisions: NextPage = () => {
  const [, , currentCycle] = useCurrentCycle()
  const [proposalsAreLoading, proposalError, proposals] = useProposals()

  if (proposalsAreLoading) {
    return (<div>Loading...</div>)
  } else if (proposalError) {
    return (<div>There was an error loading the previous results</div>)
  }

  if (proposals.length === 0 || !proposals) {
    return (
      <Layout pageTitle={"dOrg Decisions"} pageHeading={"Previous voting results"}>
        <EmptyStateWithRecommendation displayedRecommendations={2} />
      </Layout>
    )
  }


  const pastProposals = proposals.filter((proposal: any) => proposal.cycleId !== currentCycle.cycleId)

  return (
    <Layout pageTitle={"dOrg Decisions"} pageHeading={"Previous voting results"}>
      <ProposalList proposals={pastProposals} />
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/util/serverProps"
export default Decisions
