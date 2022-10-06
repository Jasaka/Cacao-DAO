import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import EmptyStateWithRecommendation from "../components/layout/EmptyStates/EmptyStateWithRecommendation";

const Home: NextPage = () => {
  return (
    <Layout view={"Funded Projects"} pageTitle={"dOrg Funded Projects"}>
      <EmptyStateWithRecommendation displayedRecommendations={3} />
    </Layout>
  )
}

export default Home
