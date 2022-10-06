import type { NextPage } from "next"
import Layout from "../../components/layout/Layout";
import Townsquare from "../../components/townsquare/Townsquare";
import ProposalDetailView from "../../components/proposal/ProposalDetailView";

const Home: NextPage = () => {
  return (
    <Layout view={"Proposals"} pageTitle={"dOrg Townsquare"}>
      <ProposalDetailView />
    </Layout>
  )
}

export default Home
