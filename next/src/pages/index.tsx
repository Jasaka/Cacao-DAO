import type { NextPage } from "next"
import Layout from "../components/layout/Layout";
import LandingFunnel from "../components/landing/LandingFunnel";
import { useSession } from "next-auth/react"
import PlaceHolder from "../components/layout/PlaceHolder"
import { useRouter } from "next/router"
import ProposalList from "../components/proposal/ProposalList"

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const router = useRouter()

  if (session && session.user.isNew) {
    router.push("/profile")
  }

  return (
    <Layout view={"LandingFunnel"} pageTitle={"dOrg LandingFunnel"} actionButton={!loading && session?.user && "Create "}>
      {loading && "Lade"}
      {!loading && session?.user ? (
        <ProposalList />
      ) : (
        <LandingFunnel />
      )}
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/serverProps"
export default Home
