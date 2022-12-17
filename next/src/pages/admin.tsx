import React from "react"
import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ActionPanel } from "../components/base/ActionPanel/ActionPanel"
import { StatDisplay } from "../components/base/StatDisplay/StatDisplay"
import { useFlags } from "@headlessui/react/dist/hooks/use-flags"

const stats = [
  { name: "Proposal Amount", stat: "12" },
  { name: "Opened Flags", stat: "2" },
  { name: "Voting Started", stat: "False" }
]

const Admin: NextPage = () => {
  const router = useRouter()
  const [isLoadingFlags, errorFlags, flags] = [false, false, [{
    flagId: "1",
    proposalTitle: "Haus brennt, bitte Löschen",
    proposalHash: "askdcsa4868468EDNCIWsdc8d",
    reason: "Well, its burning."
  }, {
    flagId: "2",
    proposalTitle: "Follow up on burning house",
    proposalHash: "a3sdf4v86a8f8ERWV3843wrv3RW8w",
    reason: "Well, it's our god given responsibility to make sure the house doesn't burn down.",
    author: "Chief Fire Officer",
    authorId: "0x123456"
  }]]
  const { data: session, status } = useSession()
  if (!session?.user?.isAdmin) {
    router.push("/")
  }

  return (
    <Layout view={"Admin Dashboard"} pageTitle={"Admin Dashboard"} pageHeading={"Admin Dashboard"}>
      <div className={"flex flex-col w-full justify-center"}>
        <StatDisplay title={"Current cycle"} stats={stats} />
        <div className={"pt-16 flex flex-row justify-center"}>
          <ActionPanel title={"Start new Cycle"}
                       description={"Start a new cycle for the DAO. This will create a new cycle and end the current cycle and voting phase, enabling the submission of new proposals. "}
                       buttonLabel={"Start New Cycle"} onclick={() => console.log("Clicked")} />
          <ActionPanel title={"Start Voting"}
                       description={"Start the voting phase for the current cycle. This will finalize all proposals and start the voting phase."}
                       buttonLabel={"Start Voting Phase"} onclick={() => console.log("Clicked")} classNames={"ml-16"} />
        </div>
      </div>
    </Layout>
  )
}


export { default as getServerSideProps } from "../lib/serverProps"
export default Admin
