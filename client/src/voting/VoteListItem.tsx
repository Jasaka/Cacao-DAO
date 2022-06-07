import React from 'react';
import QuadraticVotingWidget from '../components/QuadraticVoting/QuadraticVotingWidget';

import '../components/QuadraticVoting/voting.css';
import Button from '../components/Button/Button';

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
  handleVoteChange: (changedVote: ChangedVoteProps) => void;
}

export default function VoteListItem(props: VoteListItemProps) {
  const { proposal, vote, openVoteCredits } = props;

  const openModal = () => {
    if (proposal && proposal.id !== undefined) {
      props.handleModalOpen(proposal.id);
    } else {
      return '';
    }
  };

  if (!proposal) {
    return <div>No proposal</div>;
  } else {
    return (
      <div className='bg-white shadow sm:rounded-lg mb-4'>
        <div className='px-4 py-5 sm:p-6'>
          <div className='sm:flex sm:items-start sm:justify-between'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                {proposal.title}
              </h3>
              <div className='mt-2 max-w-xl text-sm text-gray-500'>
                <p>{proposal.description}</p>
              </div>
            </div>
            <div className='mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center'>
              <QuadraticVotingWidget
                id={proposal.id}
                currentVote={vote}
                openVoteCredits={openVoteCredits}
                handleVoteChange={props.handleVoteChange}
              />
            </div>
          </div>
          <Button className={'mt-4'} onClick={openModal} label={'More Info'} />
        </div>
      </div>
    );
  }
}
