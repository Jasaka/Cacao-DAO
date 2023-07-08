import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import LandingFunnel from "../components/landing/LandingFunnel"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import TownSquare from "../components/landing/TownSquare"
import useCurrentCycle from "../hooks/cycle/useCycle"

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const [currentCycleIsLoading, , currentCycle] = useCurrentCycle()
  const loading = status === "loading"
  const router = useRouter()

  if (session && session.user.isNew) {
    router.push("/profile")
  }

  if (!loading && !session?.user) {
    return (
      <Layout pageTitle={"Be a part of the solution"}>
        <LandingFunnel />
      </Layout>
    )
  }

  if (loading || currentCycleIsLoading) {
    return (
      <Layout pageTitle={"Be a part of the solution"}>
        Loading...
      </Layout>)
  }

  return (
    <Layout pageTitle={"Townsquare"} pageHeading={"Welcome back, " + session?.user.name + "!"}
            actionButton={currentCycle.status === "0" ? {
              label: "New Proposal",
              target: "/proposals/new"
            } : undefined}>
      <TownSquare />
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/util/serverProps"
export default Home
