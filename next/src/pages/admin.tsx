import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import { useSession } from "next-auth/react"
import PlaceHolder from "../components/layout/PlaceHolder"
import { useRouter } from "next/router"

const Admin: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  if (!session?.user?.isAdmin) {
    router.push("/")
  }

  return (
    <Layout view={"Admin Dashboard"} pageTitle={"Admin Dashboard"}>
      <PlaceHolder placeholderName={"Admin"} />
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/serverProps"
export default Admin
