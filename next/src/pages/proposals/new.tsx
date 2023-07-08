import type { NextPage } from "next"
import ProposalMask from "../../components/proposal/ProposalMask";
import Layout from "../../components/layout/Layout";

const NewProposal: NextPage = () => {

  return (
    <Layout pageTitle={"dOrg Projects pending funding"} pageHeading={"Submit a new Proposal"}>
      <ProposalMask />
    </Layout>
  )
}

export { default as getServerSideProps } from "../../lib/util/serverProps"
export default NewProposal
