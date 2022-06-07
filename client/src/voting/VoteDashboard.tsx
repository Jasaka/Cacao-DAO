import React, { useEffect, useState } from 'react';
import VoteListItem from './VoteListItem';
import '../components/QuadraticVoting/voting.css';
import { useRecoilState } from 'recoil';
import { openVoteCredits, votes } from './votingAtom';
import { getProposalList } from '../proposal/ProposalList';
import { ProposalProps } from '../proposal/ProposalDetailView';
import Modal from '../components/Modal/Modal';
import ProposalDialogDetailView from '../proposal/ProposalDialogDetailView';
import Button from '../components/Button/Button';

const proposalList = getProposalList();

export default function VoteDashboard() {
  const [currentlyOpenVoteCredits] = useRecoilState(openVoteCredits);
  const [voteList, setVoteList] = useRecoilState(votes);
  const [voted, setVoted] = useState(false);

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
      <div className={'relative'}>
        <div className={'flex justify-end m-8 top-8 sticky'}>
          <div
            className={
              'w-48 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 text-center'
            }
          >
            Open Vote Credits: {currentlyOpenVoteCredits}
          </div>
        </div>

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

        {/* Submit votes */}
        <div className={'flex justify-end'}>
          <Button onClick={() => setVoted(true)} label={'Submit Votes'} />
        </div>
      </div>
    </>
  );
}
