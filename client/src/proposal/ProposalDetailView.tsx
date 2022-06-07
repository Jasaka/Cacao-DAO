import React from 'react';

import { useParams } from 'react-router-dom';
import { getProposalById } from './ProposalList';

export interface ProposalProps {
  title: string;
  description: string;
  predictedCost: number;
  upVotes: number;
  downVotes: number;
  currentHash: string;
  id: string;
}

export default function ProposalDetailView() {
  const { id } = useParams();

  const proposal = getProposalById(id);

  // return view of proposal using tailwind classes
  if (proposal !== undefined) {
    return (
      <div className={'xl:px-40'}>
        <div className='relative pb-64 sm:pb-64 xl:col-start-1 xl:pb-24'>
          <h2 className='break-words text-sm font-semibold text-indigo-300 tracking-wide uppercase'>
            {proposal.currentHash}
          </h2>
          <p className='mt-3 text-3xl font-extrabold'>{proposal.title}</p>
          <p className='mt-5 text-lg text-gray-800'>{proposal.description}</p>
          <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
            <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Upvotes
              </dt>
              <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                {proposal.upVotes}
              </dd>
            </div>

            <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Downvotes
              </dt>
              <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                {proposal.downVotes}
              </dd>
            </div>

            <div className='px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6'>
              <dt className='text-sm font-medium text-gray-500 truncate'>
                Predicted Cost
              </dt>
              <dd className='mt-1 text-3xl font-semibold text-gray-900'>
                {proposal.predictedCost} €
              </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  } else {
    return <div>No proposal with this id</div>;
  }
}
