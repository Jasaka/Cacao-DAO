import React from 'react';
import { HashtagIcon } from '@heroicons/react/solid';

interface ProposalListItemProps {
  item: {
    id: string;
    title: string;
    predictedCost: number | null;
    upVotes: number;
    downVotes: number;
    currentHash: string;
  };
  onClick: () => void;
}

export default function ProposalListItem(props: ProposalListItemProps) {
  const { item } = props;

  const fullVoteAmount = item.upVotes + item.downVotes;
  const upVotePercentage = item.upVotes / fullVoteAmount;
  const downVotePercentage = item.downVotes / fullVoteAmount;

  const voteBarStyle = {
    backgroundImage: `linear-gradient(to right, #4EB32E ${
      upVotePercentage * 100
    }%, #B3501D ${downVotePercentage * 100}%)`,
  };

  return (
    <li key={item.id}>
      <a href='#' className='block hover:bg-gray-50'>
        <div className='px-4 py-4 sm:px-6'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-indigo-600 truncate'>
              {item.title}
            </p>
            <div className='ml-2 flex-shrink-0 flex'>
              <p className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                {item.predictedCost}
              </p>
            </div>
          </div>
          <div className='mt-2 sm:flex sm:justify-between'>
            <div className='sm:flex'>
              <div
                style={voteBarStyle}
                className={`mt-2 h-1 w-40 rounded`}
              ></div>
            </div>
            <div className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0'>
              <HashtagIcon
                className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
              <p>{item.currentHash}</p>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
