import React, { useState } from "react"
import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { ActionPanel } from "../components/base/ActionPanel/ActionPanel"
import { AdminStatDisplay } from "../components/base/StatDisplay/AdminStatDisplay"
import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import NoSsr from "../components/base/NoSsr"
import LoadingSpinner from "../components/base/LoadingStates/LoadingSpinner"
import useCurrentCycle from "../hooks/cycle/useCycle"
import useProposals from "../hooks/proposals/useProposals"
import { parsePostgresDate } from "../util/util"

const Admin: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [cycleIsLoading, cycleError, currentCycle] = useCurrentCycle()
  const [proposalsAreLoading, proposalsError, proposals] = useProposals()

  const cycleStartMutation = useMutation({
    mutationFn: (): any => {
      return axios.post("/api/cycles", { action: "new" })
    },
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: () => {
      setIsLoading(false)
      console.log("Cycle started")
      queryClient.invalidateQueries("current-cycle").then(() => {
        console.log("Invalidated current cycle")
      })
    }
  })

  const voteStartMutation = useMutation({
    mutationFn: (): any => {
      return axios.post("/api/cycles", { action: "voting" })
    },
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: () => {
      setIsLoading(false)
      console.log("Vote Started")
      queryClient.invalidateQueries("current-cycle").then(() => {
        console.log("Invalidated current cycle")
      })
    }
  })

  const voteEndMutation = useMutation({
    mutationFn: (): any => {
      return axios.post("/api/cycles", { action: "ended" })
    },
    onMutate: () => {
      setIsLoading(true)
    },
    onSuccess: () => {
      setIsLoading(false)
      console.log("Vote ended")
      queryClient.invalidateQueries("current-cycle").then(() => {
        console.log("Invalidated current cycle")
      })
    }
  })

  if (status === "loading" || cycleIsLoading || proposalsAreLoading) {
    return (
      <LoadingSpinner />)
  }

  // @ts-ignore
  if (status !== "loading" && !session?.user?.isAdmin) {
    router.push("/")
  }

  const currentCycleProposals = proposals.filter((proposal: any) => proposal.cycleId === currentCycle.cycleId)
  let cycleState = "Unknown"
  if (currentCycle.status === "0") {
    cycleState = "Proposal Submission"
  } else if (currentCycle.status === "1") {
    cycleState = "Voting"
  } else if (currentCycle.status === "2") {
    cycleState = "Ended"
  } else if (currentCycle.status === "3") {
    cycleState = "In need of Extension"
  }

  const stats = [
    { name: "Proposal Amount", stat: currentCycleProposals.length, isLoading: false, isError: false },
    { name: "Opened Flags", stat: "2", isLoading: false, isError: false },
    { name: "Cycle State", stat: cycleState, isLoading: cycleIsLoading, isError: cycleError },
    { name: "Start Date", stat: parsePostgresDate(currentCycle.startDate), isLoading: false, isError: false },
    { name: "Voting Start Date", stat: parsePostgresDate(currentCycle.proposingEndDate), isLoading: false, isError: false },
    { name: "Voting Close Date", stat: parsePostgresDate(currentCycle.votingEndDate), isLoading: cycleIsLoading, isError: cycleError }
  ]

  return (
    <Layout pageTitle={"Admin Dashboard"} pageHeading={"Admin Dashboard"}>
      <div className={"flex flex-col w-full justify-center"}>
        <AdminStatDisplay title={"Current cycle"} stats={stats} />
        <div className={"pt-16 flex flex-row justify-center"}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <ActionPanel title={"Start new Cycle"}
                           description={"Start a new cycle for the DAO. This will create a new cycle and end the current cycle and voting phase, enabling the submission of new proposals. "}
                           buttonLabel={"Start New Cycle"} onclick={() => cycleStartMutation.mutate()} />
              <ActionPanel title={"Start Voting"}
                           description={"Start the voting phase for the current cycle. This will finalize all proposals and start the voting phase."}
                           buttonLabel={"Start Voting Phase"} onclick={() => voteStartMutation.mutate()}
                           classNames={"ml-16"} />
              <ActionPanel title={"End Voting"}
                           description={"End the voting phase for the current cycle. This will send all proposals of to the smart contract and start the count."}
                           buttonLabel={"End Voting Phase"} onclick={() => voteEndMutation.mutate()}
                           classNames={"ml-16"} />
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}


export { default as getServerSideProps } from "../lib/util/serverProps"

function NoSsrAdmin() {
  return (
    <NoSsr>
      <Admin />
    </NoSsr>
  )
}

export default NoSsrAdmin
