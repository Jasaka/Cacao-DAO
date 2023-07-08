import React from "react"
import QuadraticVotingWidget from "./QuadraticVoting/QuadraticVotingWidget"
import Button from "../base/Button/Button"

export interface ChangedVoteProps {
  inFluxCredits: number;
  previouslyReservedCredits: number;
}

interface VoteListItemProps {
  proposal:
    | {
    id: string;
    title: string;
    description: string;
    predictedCost: number | null;
    upVotes: number;
    downVotes: number;
    currentHash: string;
  }
    | undefined;
  vote: number;
  openVoteCredits: number;
  handleModalOpen: (id: string) => void;
}

export default function VoteListItem(props: VoteListItemProps) {
  const { proposal, vote, openVoteCredits } = props

  const openModal = () => {
    if (proposal && proposal.id !== undefined) {
      props.handleModalOpen(proposal.id)
    } else {
      return ""
    }
  }

  const fullVoteAmount: number = proposal?.upVotes! + proposal?.downVotes!
  const upVotePercentage: number = proposal?.upVotes! / fullVoteAmount

  let leftSize = 0
  let rightSize = 0

  leftSize = Math.ceil(40 * upVotePercentage)
  rightSize = 40 - leftSize
  if (leftSize === 40 && upVotePercentage < 1) {
    leftSize = 39
    rightSize = 1
  }

  const variableWidthStyle = (part: number) => {
    return {
      width: `${part * 0.25}rem`
    }
  }

  const renderVoteRatio = () => {
    if (fullVoteAmount === 0) {
      return (
        <div className={`mt-2 w-40 h-1 rounded`}>
          <div className={`h-1 w-40 bg-gray-200`} />
        </div>
      )
    } else if (leftSize <= 0 || typeof leftSize === "undefined") {
      return (
        <div className={`mt-2 w-40 h-1 rounded`}>
          <div className={`h-1 w-40 bg-red-500`} />
        </div>
      )
    } else {
      return (
        <div className={`mt-2 w-40 h-1 rounded`}>
          <div
            style={variableWidthStyle(leftSize)}
            className={`h-1 bg-lime-500 inline-flex`}
          />
          <div
            style={variableWidthStyle(rightSize)}
            className={`h-1 bg-orange-500 inline-flex`}
          />
        </div>
      )
    }
  }

  if (!proposal) {
    return <div>No proposal</div>
  } else {
    return (
      <div className="w-full flex flex-col items-center mb-4">
        <div className="bg-white shadow sm:rounded-lg mb-4">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-start sm:justify-between">
              <div className={""}>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {proposal.title}
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>{proposal.description}</p>
                </div>
              </div>
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                <QuadraticVotingWidget
                  id={proposal.id}
                  currentVote={vote}
                  openVoteCredits={openVoteCredits}
                />
              </div>
            </div>
            <Button
              className={"mt-4"}
              onClick={openModal}
              label={"More Info"}
            />
          </div>
        </div>
      </div>
    )
  }
}
