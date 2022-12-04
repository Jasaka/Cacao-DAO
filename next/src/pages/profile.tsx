import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import PlaceHolder from "../components/layout/PlaceHolder";
import useUsers from "../hooks/users/useUsers"

const Home: NextPage = () => {
  const [ isLoading, error, data ] = useUsers()


  return (
    <Layout view={"Profile"} pageTitle={"dOrg Profile"}>
      <PlaceHolder placeholderName={"Profile"} />
    </Layout>
  )
}

export default Home
