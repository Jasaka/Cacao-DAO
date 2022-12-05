import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import PlaceHolder from "../components/layout/PlaceHolder"

const FAQ: NextPage = () => {

  return (
    <Layout view={"LandingFunnel"} pageTitle={"dOrg LandingFunnel"}>
      <PlaceHolder placeholderName={"FAQ"} />
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/serverProps"
export default FAQ
