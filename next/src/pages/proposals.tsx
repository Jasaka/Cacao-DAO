import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import ProposalList from "../components/proposal/ProposalList"

const Home: NextPage = () => {
  return (
    <Layout view={"Proposals"} pageTitle={"dOrg Proposals"} pageHeading={"Proposals"}
            actionButton={{ label: "New Proposal", target: "/proposals/new" }}>
      <ProposalList />
    </Layout>
  )
}

export default Home
