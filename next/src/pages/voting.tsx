import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import Voting from "./voting";
import VoteDashboard from "../components/voting/VoteDashboard";

const Home: NextPage = () => {

  return (
    <Layout view={"Voting"} pageTitle={"dOrg Voting"}>
      <VoteDashboard />
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/serverProps"
export default Home
