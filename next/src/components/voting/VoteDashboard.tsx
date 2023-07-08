import React, { useEffect, useState } from "react"
import VoteListItem from "./VoteListItem"
import { useRecoilState } from "recoil"
import { openVoteCredits, votes } from "./votingAtom"
import { ProposalProps } from "../proposal/ProposalDetailView"
import ProposalDialogDetailView from "../proposal/ProposalDialogDetailView"
import Modal from "../base/Modal/Modal"
import Button from "../base/Button/Button"

interface VoteDashboardProps {
  proposals: any
}
export default function VoteDashboard({ proposals }: VoteDashboardProps) {
  const [currentlyOpenVoteCredits] = useRecoilState(openVoteCredits)
  const [voteList, setVoteList] = useRecoilState(votes)
  const [voted, setVoted] = useState(false)
  const [openCreditStyle, setOpenCreditStyle] = useState({
    background: `rgb(45, 45, 45)`,
    transition: "background 0.5s ease-out"
  })

  useEffect(() => {
    const colorBorder = 100 - currentlyOpenVoteCredits

    setOpenCreditStyle({
      background: `linear-gradient(90deg, rgba(45, 45, 45, 1) ${colorBorder}%, rgba(65, 202, 56,1) ${colorBorder}%)`,
      transition: "background 0.5s ease-out"
    })
  }, [currentlyOpenVoteCredits])

  useEffect(() => {
    if(!proposals) return
    const newVoteList = [...voteList]
    proposals.forEach((proposal: ProposalProps) => {
      if (newVoteList.find((vote) => vote.id === proposal.id)) {
        return
      }
      newVoteList.push({
        id: proposal.id,
        vote: 0
      })
    })
    setVoteList(newVoteList)
  }, [proposals])

  const [modal, setModal] = useState({ open: false, id: "" })

  const openModal = (id: string) => {
    console.log("openModal", id)
    setModal({ open: true, id: id })
  }

  const closeModal = () => {
    setModal({ open: false, id: "" })
  }

  if (voted) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className={"text-center font-bold mt-8 text-4xl"}>Thank you for voting!</p>
          <p className={"text-center font-bold mt-8 text-xl"}>You have voted on all proposals.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Modal onClose={closeModal} isOpen={modal.open}>
        <ProposalDialogDetailView proposalId={modal.id} />
      </Modal>

      <div className={"relative flex flex-row flex-row-reverse my-8 lg:mx-24"}>
        <div className={"flex justify-end ml-8 top-8 right-8 sticky h-16"}>
          <div
            style={openCreditStyle}
            className={
              "w-32 p-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 text-center"
            }
          >
            Open Vote Credits: {currentlyOpenVoteCredits}
          </div>
        </div>
        <div className={"flex flex-col w-full"}>
          {voteList.map((vote) => {
            return (
              <VoteListItem
                key={vote.id}
                proposal={proposals.find(
                  (proposal: ProposalProps) => vote.id === proposal.id
                )}
                vote={vote.vote}
                openVoteCredits={currentlyOpenVoteCredits}
                handleModalOpen={(id) => openModal(id)}
              />
            )
          })}
        </div>
      </div>
      {/* Submit votes */}
      <div className={"flex justify-end"}>
        <Button onClick={() => setVoted(true)} label={"Submit Votes"} />
      </div>
    </>
  )
}
