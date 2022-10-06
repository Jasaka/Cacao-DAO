import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import Login from "../components/login/Login";

const Home: NextPage = () => {
  return (
    <Layout view={"Login"} pageTitle={"dOrg Login"}>
      <Login />
    </Layout>
  )
}

export default Home
