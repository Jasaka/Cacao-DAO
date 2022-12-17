import React from 'react';
import AppSettings from "../../../data/settings"

export default function Footer() {
  return (
    <footer>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl'>
        <div className='border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left'>
          <span className='block sm:inline'>© {AppSettings.content.organizationName} | </span>
          <span className='block sm:inline'>🌏 dOrg plattform provided by CacaoDAO for a better World.</span>{' '}
          <span className='block sm:inline'>
            Join them in their{' '}
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
