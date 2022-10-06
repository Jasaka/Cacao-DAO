import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import Townsquare from "../components/townsquare/Townsquare";

const Home: NextPage = () => {
  return (
    <Layout view={"Townsquare"} pageTitle={"dOrg Townsquare"}>
      <Townsquare />
    </Layout>
  )
}

export default Home
