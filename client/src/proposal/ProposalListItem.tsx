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
  clickHandler: () => void;
}

export default function ProposalListItem(props: ProposalListItemProps) {
  const { item } = props;

  const fullVoteAmount: number = item.upVotes + item.downVotes;
  const upVotePercentage: number = item.upVotes / fullVoteAmount;

  let leftSize = 0;
  let rightSize = 0;

  leftSize = Math.ceil(40 * upVotePercentage);
  rightSize = 40 - leftSize;
  if (leftSize === 40 && upVotePercentage < 1) {
    leftSize = 39;
    rightSize = 1;
  }

  const variableWidthStyle = (part: number) => {
    return {
      width: `${part * 0.25}rem`,
    };
  };

  const renderVoteRatio = () => {
    if (fullVoteAmount === 0) {
      return (
        <div className={`mt-2 w-40 h-1 rounded`}>
          <div className={`h-1 w-40 bg-gray-200`} />
        </div>
      );
    } else if (leftSize <= 0 || typeof leftSize === 'undefined') {
      return (
        <div className={`mt-2 w-40 h-1 rounded`}>
          <div className={`h-1 w-40 bg-red-500`} />
        </div>
      );
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
      );
    }
  };

  return (
    <li onClick={props.clickHandler} key={item.id}>
      <div className='block hover:bg-gray-50 cursor-pointer'>
        <div className='px-4 py-4 sm:px-6'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-indigo-600 truncate'>
              {item.title}
            </p>
            <div className='ml-2 flex-shrink-0 flex'>
              <p className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                Estimated Project Cost: {item.predictedCost}€
              </p>
            </div>
          </div>
          <div className='mt-2 flex justify-between'>
            <div className='sm:flex'>{renderVoteRatio()}</div>
            <div className='mt-2 flex items-center text-sm text-gray-500'>
              <HashtagIcon
                className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
              <p>{item.currentHash.substring(0, 8)}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
