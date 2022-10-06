import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import EmptyStateWithRecommendation from "../components/layout/EmptyStates/EmptyStateWithRecommendation";

const Home: NextPage = () => {
  return (
    <Layout view={"Projects pending funding"} pageTitle={"dOrg Projects pending funding"}>
      <EmptyStateWithRecommendation displayedRecommendations={2} />
    </Layout>
  )
}

export default Home
