import type { NextPage } from "next"
import Layout from "../../components/layout/Layout";
import ProposalDetailView from "../../components/proposal/ProposalDetailView";

const Proposal: NextPage = () => {

  return (
    <Layout view={"Proposals"} pageTitle={"dOrg LandingFunnel"}>
      <ProposalDetailView />
    </Layout>
  )
}

export { default as getServerSideProps } from "../../lib/serverProps"
export default Proposal
