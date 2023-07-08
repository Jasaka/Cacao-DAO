import React, { useState } from "react"

import useProposal from "../../hooks/proposals/useProposal"
import useUser from "../../hooks/users/useUser"
import { UserAvatar } from "../user/UserAvatar"
import { useSession } from "next-auth/react"
import {
  ArrowDownTrayIcon,
  EnvelopeIcon,
  FlagIcon,
  LockClosedIcon,
  LockOpenIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline"
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/solid"
import useCurrentCycle from "../../hooks/cycle/useCycle"
import useProposalFlags from "../../hooks/proposals/useProposalFlags"
import useProposalVersions from "../../hooks/proposals/useProposalVersions"
import useProposalVotes from "../../hooks/proposals/useProposalVotes"
import ProposalMask from "./ProposalMask"

export interface ProposalProps {
  title: string;
  description: string;
  predictedCost: number;
  upVotes: number;
  downVotes: number;
  currentHash: string;
  id: string;
}

export default function ProposalDetailView({ proposalId }: { proposalId: string }) {
  const [isEdited, setIsEdited] = useState(false)
  const [proposalIsLoading, proposalError, proposal] = useProposal(proposalId)
  const session = useSession()

  const isOwner = session.data?.user.id === proposal?.authorId

  if (proposalIsLoading) {
    return (<div>Loading...</div>)
  } else if (proposalError) {
    return (<div>There was an error loading the proposal</div>)
  }

  if (isEdited) {
    return (
      <ProposalMask />
    )
  }

  if (proposal !== undefined) {
    return (
      <div className="flex flex-col">
        <ProposalDetailHeading isOwner={isOwner} proposal={proposal} editCallback={() => setIsEdited(true)}/>
        <hr className="mb-4" />
        <div className={"flex md:flex-row flex-col-reverse"}>
          <div className={"flex flex-col w-2/3 md:border-r md:border-gray-200"}>
            <ProposalDetails proposal={proposal} />
            <ProposalFlags proposalId={proposalId} />
          </div>
          <div className={"flex flex-col w-1/3 md:ml-8"}>
            <ProposalVotes proposalId={proposalId} />
            <ProposalStatusDetails proposal={proposal} />
            <hr className="my-4" />
            <AuthorDetails authorId={proposal.authorId} />
            <hr className="my-4" />
            <ProposalVersionHistory proposalId={proposalId} />
          </div>
        </div>
      </div>
    )
  } else {
    return <div>No proposal with this id</div>
  }
}

const AuthorDetails = ({ authorId }: { authorId: string }) => {
  const [authorIsLoading, authorError, author] = useUser(authorId)
  if (authorIsLoading || author === undefined) {
    return (<div>Loading...</div>)
  } else if (authorError) {
    return (<div>There was an error loading the author</div>)
  }
  return (
    <>
      <h2 className="text-sm font-medium text-gray-500">
        Submitted by
      </h2>
      <div className="ml-4 mt-4 flex flex-col">
        <span className="flex flex-row items-center"><UserAvatar userId={authorId} avatarUrl={author.imageUrl} /><span
          className="ml-4 mr-2 font-medium text-gray-900">{author.name}</span>
          <a className="hover:text-gray-500"
             href={"mailto:" + author.email}>
            <EnvelopeIcon className="w-4" />
          </a>
        </span>
        <p className="pl-4 border-l-4 mt-4 prose">{author.about}</p>
      </div>
    </>
  )
}

const ProposalDetailHeading = ({ proposal, isOwner, editCallback}: any) => {
  const [cycleIsLoading, , currentCycle] = useCurrentCycle()

  if (cycleIsLoading) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900">
        {proposal.title}
      </h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <span className="ml-4 mt-2 text-sm text-gray-500">Proposal ID: {proposal.id}</span>
          <span className="ml-4 mb-2 text-sm text-gray-500">Hash: {proposal.currentHash}</span>
        </div>
        <div className="flex flex-row text-gray-200 font-medium mb-2 items-end lg:w-1/2 w-1/4 justify-end">
          {isOwner && proposal.status != 2 && currentCycle.status === "0" &&
            <button className="px-4 h-8 bg-yellow-600 rounded mr-8" onClick={editCallback}>Edit</button>}
          {isOwner && proposal.status != 2 && currentCycle.status === "0" &&
            <button className="px-4 h-8 bg-lime-600 flex flex-row items-center rounded mr-8">Finalize<LockClosedIcon
              className="w-4" /></button>}
          {!isOwner && <button className="px-4 h-8 bg-red-600 flex flex-row items-center rounded">Flag<FlagIcon
            className="w-4 ml-2" /></button>}
        </div>
      </div>
    </div>)
}

const ProposalDetails = ({ proposal }: any) => {
  return (
    <div className="ml-4">
      <h2 className="text-sm font-medium text-gray-500">
        Estimated Cost
      </h2>
      <div className="ml-4 prose">{proposal.predictedCost} €</div>
      <h2 className="text-sm font-medium text-gray-500">
        Description
      </h2>
      <div className="ml-4 prose">{proposal.description}</div>
    </div>)
}

const ProposalStatusDetails = ({ proposal }: any) => {
  if (proposal.status == 1) {
    return (
      <>
        <h2 className="mt-4 text-sm font-medium text-gray-500">
          Status
        </h2>
        <div
          className="ml-4 mt-4 w-28 flex flex-row items-center justify-center rounded-full border border-gray-300 px-3 py-0.5 bg-yellow-100">
          <LockOpenIcon className="mr-2 w-4 font-medium text-gray-900" />Pending
        </div>
      </>
    )
  }
  return (
    <>
      <h2 className="mt-4 text-sm font-medium text-gray-500">
        Status
      </h2>
      <div
        className="ml-4 mt-4 w-28 flex flex-row items-center justify-center rounded-full border border-gray-300 px-3 py-0.5 bg-lime-100">
        <LockClosedIcon className="mr-2 w-4 font-medium text-gray-900" />Finalized
      </div>
    </>
  )
}

const ProposalVotes = ({ proposalId }: { proposalId: string }) => {
  const [votesAreLoading, votesError, votes] = useProposalVotes(proposalId)

  if (votesAreLoading) {
    return (<div>Loading Votes...</div>)
  } else if (votesError) {
    return (<div>Error: {votesError}</div>)
  }

  return (
    <>
      <h2 className="mb-4 text-sm font-medium text-gray-500">
        Votes
      </h2>
      <div className="ml-4 flex flex-row items-center font-medium"><ArrowUpCircleIcon
        className={"w-6 text-lime-600 mr-2"} /> {votes.upVotes}
      </div>
      <div className="ml-4 flex flex-row items-center font-medium"><ArrowDownCircleIcon
        className={"w-6 text-red-600 mr-2"} /> {votes.downVotes}
      </div>
    </>
  )
}

const ProposalFlags = ({ proposalId }: { proposalId: string }) => {
  const [flagsIsLoading, flagsError, flags] = useProposalFlags(proposalId)

  if (flagsIsLoading) {
    return (<div>Loading Possible Flags...</div>)
  } else if (flagsError) {
    return (<div>Error: {flagsError}</div>)
  }

  if (flags.length > 0) {
    return (
      <>
        <hr className="mr-8 mt-16 mb-4" />
        <div className={"ml-4"}>
          <div className="text-red-600 mb-4">This proposal has been flagged.</div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Flags
          </h2>
          <div className="ml-4">
            <ul className={"-mb-8"}>
              {flags.map((flag: any, flagIndex: number) => (
                <li key={flag.id}>
                  <div className="relative pb-8">
                    {flagIndex !== flags.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={"bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"}
                        >
                          {flag.authorIsPublic === true ? (
                            <UserAvatar userId={ flag.authorId } avatarUrl={"https://avatars.githubusercontent.com/u/9197608?v=4"} />
                          ) : (
                            <UserCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                          )}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-md text-gray-900 font-bold">{flag.authorIsPublic === true ? "Jan Samak" : "Anonymous Author"}</h3>
                        <p className="text-md text-gray-500">
                          {flag.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  } else {
    return (null)
  }
}

const ProposalVersionHistory = ({ proposalId }: { proposalId: string }) => {
  const [versionHistoryIsLoading, versionHistoryError, versionHistory] = useProposalVersions(proposalId)

if (versionHistoryIsLoading) {
    return (<div>Loading Version History...</div>)
} else if (versionHistoryError) {
    return (<div>Error: {versionHistoryError}</div>)
}

  return (
    <>
      <h2 className="text-sm font-medium text-gray-500">
        Version History
      </h2>
      {versionHistory.map((version: any) => (
      <a key={version.hash} href={"https://arweave.net/" + version.arweaveId}
         target={"_blank"}
         rel="noreferrer"
         className="ml-4 flex flex-row hover:text-gray-500 hover:cursor-pointer">
        # <span className="truncate w-48"> {version.hash} </span>
        <ArrowDownTrayIcon className="ml-4 w-4" />
      </a>
      ))}
    </>
  )
}
