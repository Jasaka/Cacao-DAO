import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import EmptyStateWithRecommendation from "../components/layout/EmptyStates/EmptyStateWithRecommendation";

const Decisions: NextPage = () => {
  return (
    <Layout view={"Proposals which were voted on"} pageTitle={"dOrg Decisions"}>
      <EmptyStateWithRecommendation displayedRecommendations={2} />
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/serverProps"
export default Decisions
