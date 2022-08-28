import React from 'react';
import SubmitButton from '../components/Button/SubmitButton';

export default function ProposalMask() {
  return (
    <div className=''>
      <p className='mt-4 text-lg text-gray-500 sm:mt-3'>
        Something-something, this is how it works.
      </p>
      <form
        action='#'
        method='POST'
        className='mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'
      >
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <div className='mt-1'>
            <input
              type='text'
              name='title'
              id='title'
              className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <div className='flex justify-between'>
            <label
              htmlFor='proposal-description'
              className='block text-sm font-medium text-gray-700'
            >
              Description of Proposal
            </label>
            <span
              id='proposal-description-description'
              className='text-sm text-gray-500'
            >
              Try to stay above 500 characters.
            </span>
          </div>
          <div className='mt-1'>
            <textarea
              id='proposal-description'
              name='proposal-description'
              aria-describedby='proposal-description-description'
              rows={4}
              className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md'
              defaultValue={''}
            />
          </div>
        </div>
        <div className='sm:col-span-2'>
          <div className='flex justify-between'>
            <label
              htmlFor='estimated-cost'
              className='block text-sm font-medium text-gray-700'
            >
              Estimated Cost of Completion
            </label>
            <span
              id='estimated-cost-description'
              className='text-sm text-gray-500'
            >
              Optional
            </span>
          </div>
          <div className='mt-1'>
            <input
              type='number'
              name='estimated-cost'
              id='estimated-cost'
              aria-describedby='estimated-cost-description'
              className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
            />
          </div>
        </div>

        <div className='text-right sm:col-span-2'>
          <SubmitButton label={'Submit'} />
        </div>
      </form>
    </div>
  );
}
