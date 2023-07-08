import type { NextPage } from "next"
import Layout from "../../components/layout/Layout";
import ProposalDetailView from "../../components/proposal/ProposalDetailView";
import { useRouter } from "next/router"

const Proposal: NextPage = () => {
  const router = useRouter();
  const { proposalId } = router.query;
  let id = proposalId as string;

  return (
    <Layout pageTitle={"dOrg LandingFunnel"}>
      <ProposalDetailView proposalId={id} />
    </Layout>
  )
}

export { default as getServerSideProps } from "../../lib/util/serverProps"
export default Proposal
