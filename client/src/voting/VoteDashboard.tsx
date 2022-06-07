import React, { useEffect, useState } from 'react';
import VoteListItem, { ChangedVoteProps } from './VoteListItem';
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

  const [barValues, setBarValues] = useState({
    maxCredits: 100,
    reservedCredits: 0,
    inFluxCredits: 0,
  });

  const [visualisationBarStyles, setVisualisationBarStyles] = useState({
    reservedStyle: {
      width: `0px`,
    },
    inFluxStyle: {
      width: `0px`,
    },
  });

  useEffect(() => {
    const barSize = 158;

    console.log('updating styles');
    const reservedWidth =
      (barSize * barValues.reservedCredits) / barValues.maxCredits;
    const inFluxWidth =
      (barSize * barValues.inFluxCredits) / barValues.maxCredits;

    setVisualisationBarStyles({
      reservedStyle: {
        width: `${reservedWidth}px`,
      },
      inFluxStyle: {
        width: `${inFluxWidth}px`,
      },
    });
  }, [barValues]);

  const updateCreditBar = (changedVote: ChangedVoteProps) => {
    setBarValues({
      maxCredits: barValues.maxCredits,
      reservedCredits: barValues.maxCredits - currentlyOpenVoteCredits,
      inFluxCredits: changedVote.inFluxCredits,
    });
  };

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
            <div className={'w-full h-8 flex flex-row mt-4'}>
              <div className={'w-full h-6 bg-blue-300 flex flex-row'}>
                <div
                  style={visualisationBarStyles.reservedStyle}
                  className={'h6 bg-gray-500'}
                />
                <div
                  style={visualisationBarStyles.inFluxStyle}
                  className={'w-8 h6 bg-red-600'}
                />
              </div>
            </div>
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
              handleVoteChange={(changedVote) => updateCreditBar(changedVote)}
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
