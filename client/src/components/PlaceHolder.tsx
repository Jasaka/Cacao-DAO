import React from 'react';

interface PlaceholderProps {
  placeholderName: string;
}

export default function PlaceHolder(prop: PlaceholderProps) {
  const { placeholderName } = prop;
  return (
    <div className='px-4 py-6 sm:px-0'>
      <div className='border-4 border-dashed border-gray-200 rounded-lg h-96'>
        <div className='flex items-center justify-center h-full'>
          <div className='text-center'>
            <p className='text-lg leading-6 font-medium text-gray-900'>
              {placeholderName}
            </p>
            <p className='mt-2 text-3xl leading-8 font-extrabold text-gray-900'>
              Coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
