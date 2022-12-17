import type { NextPage } from "next"
import ProposalMask from "../../components/proposal/ProposalMask";
import Layout from "../../components/layout/Layout";

const NewProposal: NextPage = () => {

  return (
    <Layout view={"Projects pending funding"} pageTitle={"dOrg Projects pending funding"}>
      <ProposalMask />
    </Layout>
  )
}

export { default as getServerSideProps } from "../../lib/serverProps"
export default NewProposal
