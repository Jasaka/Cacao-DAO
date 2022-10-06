import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import {
  AdjustmentsIcon,
  CashIcon,
  DocumentAddIcon,
} from '@heroicons/react/outline';
import {classNames} from "../../../util/util";

const items = [
  {
    name: 'Create a new proposal',
    description: 'If you have an idea for a proposal, start here.',
    href: '/proposals/new',
    iconColor: 'bg-pink-500',
    icon: DocumentAddIcon,
  },
  {
    name: 'Vote on existing proposals',
    description: 'Use your voting Credits to vote on existing proposals.',
    href: '/voting',
    iconColor: 'bg-purple-500',
    icon: AdjustmentsIcon,
  },
  {
    name: 'Contribute to proposal funding',
    description: 'Use your funding Credits to help fund the best proposals.',
    href: '/pending',
    iconColor: 'bg-yellow-500',
    icon: CashIcon,
  },
];

interface EmptyStateWithRecommendationProps {
  displayedRecommendations: 1 | 2 | 3;
}

export default function EmptyStateWithRecommendation(
  props: EmptyStateWithRecommendationProps,
) {
  const { displayedRecommendations } = props;
  const itemsToDisplay = items.slice(0, displayedRecommendations);

  return (
    <div className='max-w-lg mx-auto'>
      <h2 className='text-lg font-medium text-gray-900'>
        This category is currently empty
      </h2>
      <p className='mt-1 text-sm text-gray-500'>
        Help filling it up by adding a new proposal or voting on existing ones.
      </p>
      <ul
        role='list'
        className='mt-6 border-t border-b border-gray-200 divide-y divide-gray-200'
      >
        {itemsToDisplay.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className='relative group py-4 flex items-start space-x-3'>
              <div className='flex-shrink-0'>
                <span
                  className={classNames(
                    item.iconColor,
                    'inline-flex items-center justify-center h-10 w-10 rounded-lg',
                  )}
                >
                  <item.icon
                    className='h-6 w-6 text-white'
                    aria-hidden='true'
                  />
                </span>
              </div>
              <div className='min-w-0 flex-1'>
                <div className='text-sm font-medium text-gray-900'>
                  <a href={item.href}>
                    <span className='absolute inset-0' aria-hidden='true' />
                    {item.name}
                  </a>
                </div>
                <p className='text-sm text-gray-500'>{item.description}</p>
              </div>
              <div className='flex-shrink-0 self-center'>
                <ChevronRightIcon
                  className='h-5 w-5 text-gray-400 group-hover:text-gray-500'
                  aria-hidden='true'
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='mt-6 flex'>
        <a
          href='/src/pages/proposals'
          className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
        >
          Or peruse currently opened proposals
          <span aria-hidden='true'> &rarr;</span>
        </a>
      </div>
    </div>
  );
}
