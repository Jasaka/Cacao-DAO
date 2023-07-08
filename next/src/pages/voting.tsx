import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import VoteDashboard from "../components/voting/VoteDashboard"
import useProposals from "../hooks/proposals/useProposals"
import EmptyStateWithRecommendation from "../components/layout/EmptyStates/EmptyStateWithRecommendation"
import useCurrentCycle from "../hooks/cycle/useCycle"
import React from "react"

const Voting: NextPage = () => {

  const [proposalsAreLoading, proposalError, proposalList] = useProposals()
  const [currentCyleIsLoading, currentCycleError, currentCycle] = useCurrentCycle()

  if (proposalsAreLoading || currentCyleIsLoading) {
    return (<div>Loading...</div>)
  } else if (proposalError || currentCycleError) {
    return (<div>There was an error loading the proposals</div>)
  }

  if (currentCycle.status !== "1") {
    return (
      <Layout pageTitle={"dOrg Voting"}>
        <VotingInformation />
        <p className={"text-center font-bold mt-8 text-4xl"}>No Voting in Session</p>
        {currentCycle.status === "0" ? (<p className={"text-center font-bold mt-8 text-xl"}>Please check back after {new Date(currentCycle.proposingEndDate.replace(' ', 'T')).toLocaleDateString()}</p>) : (null)}
      </Layout>
    )
  }

  const currentProposals = proposalList.filter((proposal: any) => proposal.cycleId === currentCycle.cycleId)

  return (
    <Layout pageTitle={"dOrg Voting"}>
      {proposalList.length >= 1 ? (
        <>
          <VotingInformation />
          <VoteDashboard proposals={currentProposals} />
        </>
      ) : (
        <EmptyStateWithRecommendation displayedRecommendations={1} />
      )}
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/util/serverProps"
export default Voting


const VotingInformation = () => {
  return (
    <div className={"rounded p-16 mx-12 mt-4 bg-gray-100 border"}>
      <p>
        Quadratic voting is a collective decision-making procedure which
        involves individuals allocating votes to express the degree of their
        preferences, rather than just the direction of their preferences. By
        doing so, quadratic voting seeks to address issues of voting paradox
        and majority rule.
      </p>
      <br />
      <h2 className={"text-xl"}>How it works</h2>
      <img
        src={"img/voting_interaction.gif"}
        alt="logo"
        className={"w-auto h-16 rounded my-4"}
      />
      <p>
        You can vote on any proposal you want. You do not need to spend all
        points and there might be instances where you will not be able to spend
        all points. Casting more votes on a single proposal will increase the
        price of voting on that proposal exponentially. Specifically the price
        of voting on a proposal will increase by the square of the number of
        votes you have cast on that proposal.
      </p>
    </div>
  )
}
