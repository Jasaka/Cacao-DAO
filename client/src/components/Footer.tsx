import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl'>
        <div className='border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left'>
          <span className='block sm:inline'>🌏 For a better World.</span>{' '}
          <span className='block sm:inline'>
            Join us in our{' '}
            <a
              className='text-emerald-700'
              href='https://github.com/Jasaka/Cacao-DAO'
              target='_blank'
              rel='noopener noreferrer'
            >
              Open Source
            </a>{' '}
            vision.
          </span>
        </div>
      </div>
    </footer>
  );
}
