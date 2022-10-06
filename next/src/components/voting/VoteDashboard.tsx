import React, { useEffect, useState } from 'react';
import VoteListItem from './VoteListItem';
import { useRecoilState } from 'recoil';
import { openVoteCredits, votes } from './votingAtom';
import { getProposalList } from '../proposal/ProposalList';
import { ProposalProps } from '../proposal/ProposalDetailView';
import ProposalDialogDetailView from '../proposal/ProposalDialogDetailView';
import Modal from "../base/Modal/Modal";
import Button from "../base/Button/Button";

const proposalList = getProposalList();

export default function VoteDashboard() {
  const [currentlyOpenVoteCredits] = useRecoilState(openVoteCredits);
  const [voteList, setVoteList] = useRecoilState(votes);
  const [voted, setVoted] = useState(false);
  const [openCreditStyle, setOpenCreditStyle] = useState({
    background: `rgb(45, 45, 45)`,
    transition: 'background 0.5s ease-out',
  });

  useEffect(() => {
    const colorBorder = 100 - currentlyOpenVoteCredits;

    setOpenCreditStyle({
      background: `linear-gradient(90deg, rgba(45, 45, 45, 1) ${colorBorder}%, rgba(65, 202, 56,1) ${colorBorder}%)`,
      transition: 'background 0.5s ease-out',
    });
  }, [currentlyOpenVoteCredits]);

  useEffect(() => {
    const newVoteList = [...voteList];
    proposalList.forEach((proposal: ProposalProps) => {
      if (newVoteList.find((vote) => vote.id === proposal.id)) {
        return;
      }
      newVoteList.push({
        id: proposal.id,
        vote: 0,
      });
    });
    setVoteList(newVoteList);
  }, [proposalList]);

  const [modal, setModal] = useState({ open: false, id: '' });

  const openModal = (id: string) => {
    console.log('openModal', id);
    setModal({ open: true, id: id });
  };

  const closeModal = () => {
    setModal({ open: false, id: '' });
  };

  if (voted) {
    return (
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <h2>Thank you for voting</h2>
          <p>You have voted on all proposals.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Modal onClose={closeModal} isOpen={modal.open}>
        <ProposalDialogDetailView proposalId={modal.id} />
      </Modal>
      <div className={'rounded p-16 mx-12 mt-4 bg-gray-100 border'}>
        <p>
          Quadratic voting is a collective decision-making procedure which
          involves individuals allocating votes to express the degree of their
          preferences, rather than just the direction of their preferences. By
          doing so, quadratic voting seeks to address issues of voting paradox
          and majority rule.
        </p>
        <br />
        <h2 className={'text-xl'}>How it works</h2>
        <img
          src={'img/voting_interaction.gif'}
          alt='logo'
          className={'w-auto h-16 rounded my-4'}
        />
        <p>
          You can vote on any proposal you want. You do not need to spend all
          points and there might be instances where you won't be able to spend
          all points. Casting more votes on a single proposal will increase the
          price of voting on that proposal exponentially. Specifically the price
          of voting on a proposal will increase by the square of the number of
          votes you have cast on that proposal.
        </p>
      </div>
      <div className={'relative flex flex-row flex-row-reverse my-8 lg:mx-24'}>
        <div className={'flex justify-end ml-8 top-8 right-8 sticky h-16'}>
          <div
            style={openCreditStyle}
            className={
              'w-32 p-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 text-center'
            }
          >
            Open Vote Credits: {currentlyOpenVoteCredits}
          </div>
        </div>
        <div className={'flex flex-col w-full'}>
          {voteList.map((vote) => {
            return (
              <VoteListItem
                key={vote.id}
                proposal={proposalList.find(
                  (proposal: ProposalProps) => vote.id === proposal.id,
                )}
                vote={vote.vote}
                openVoteCredits={currentlyOpenVoteCredits}
                handleModalOpen={(id) => openModal(id)}
              />
            );
          })}
        </div>
      </div>
      {/* Submit votes */}
      <div className={'flex justify-end'}>
        <Button onClick={() => setVoted(true)} label={'Submit Votes'} />
      </div>
    </>
  );
}
