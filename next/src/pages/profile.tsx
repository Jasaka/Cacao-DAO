import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import PlaceHolder from "../components/layout/PlaceHolder";
import { useSession } from "next-auth/react"

const Profile: NextPage = () => {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <Layout view={"Profile"} pageTitle={"dOrg Profile"}>
      <PlaceHolder placeholderName={"Profile"} />
      <div className={"whitespace-pre-wrap"}>{JSON.stringify(user, null, 2)}</div>

    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/serverProps"
export default Profile
