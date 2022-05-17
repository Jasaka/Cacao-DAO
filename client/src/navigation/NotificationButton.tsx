import React from 'react';
import { BellIcon } from '@heroicons/react/outline';

interface NotificationButtonProps {
  displaySize: 'small' | 'large';
}

export default function NotificationButton(props: NotificationButtonProps) {
  let returnedResult;
  if (props.displaySize === 'large') {
    returnedResult = (
      <button
        type='button'
        className='ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
      >
        <span className='sr-only'>View notifications</span>
        <BellIcon className='h-6 w-6' aria-hidden='true' />
      </button>
    );
  } else {
    returnedResult = (
      <button
        type='button'
        className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
      >
        <span className='sr-only'>View notifications</span>
        <BellIcon className='h-6 w-6' aria-hidden='true' />
      </button>
    );
  }
  return returnedResult;
}
