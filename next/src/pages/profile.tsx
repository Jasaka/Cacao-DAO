import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import PlaceHolder from "../components/layout/PlaceHolder";

const Home: NextPage = () => {
  return (
    <Layout view={"Profile"} pageTitle={"dOrg Profile"}>
      <PlaceHolder placeholderName={"Profile"} />
    </Layout>
  )
}

export default Home
