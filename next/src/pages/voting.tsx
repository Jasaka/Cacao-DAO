import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import VoteDashboard from "../components/voting/VoteDashboard";
import useProposals from "../hooks/proposals/useProposals"
import EmptyStateWithRecommendation from "../components/layout/EmptyStates/EmptyStateWithRecommendation"

const Voting: NextPage = () => {

  const [proposalsAreLoading, proposalError, proposalList] = useProposals()

  return (
    <Layout view={"Voting"} pageTitle={"dOrg Voting"}>
      {proposalsAreLoading ? (
        <div>Loading...</div>
      ) : (
      proposalList.length >= 1 ? (
        <VoteDashboard />
      ) : (
        <EmptyStateWithRecommendation displayedRecommendations={1} />
      ) )}
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/serverProps"
export default Voting
