import React from 'react';
import {
  CogIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  CashIcon,
  LinkIcon,
} from '@heroicons/react/outline';
import ProposalList from '../proposal/ProposalList';

const features = [
  {
    name: 'Persisted on the blockchain',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: LinkIcon,
  },
  {
    name: 'Funding for your Community Project',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: CashIcon,
  },
  {
    name: 'Social Change',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: RefreshIcon,
  },
  {
    name: 'Advanced Security',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Powerful API',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: CogIcon,
  },
  {
    name: 'Forever on Arweave',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
];

export default function Townsquare() {
  return (
    <>
      <div className='relative bg-white py-8 sm:py-16 lg:py-24'>
        <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='text-base font-semibold uppercase tracking-wider text-indigo-600'>
            Find Consensus
          </h2>
          <p className='mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Everything you need to realize true consensus
          </p>
          <p className='mx-auto mt-5 max-w-prose text-xl text-gray-500'>
            Phasellus lorem quam molestie id quisque diam aenean nulla in.
            Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
            condimentum id viverra nulla.
          </p>
          <div className='mt-12'>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {features.map((feature) => (
                <div key={feature.name} className='pt-6'>
                  <div className='flow-root rounded-lg bg-gray-50 px-6 pb-8'>
                    <div className='-mt-6'>
                      <div>
                        <span className='inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg'>
                          <feature.icon
                            className='h-6 w-6 text-white'
                            aria-hidden='true'
                          />
                        </span>
                      </div>
                      <h3 className='mt-8 text-lg font-medium tracking-tight text-gray-900'>
                        {feature.name}
                      </h3>
                      <p className='mt-5 text-base text-gray-500'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='relative'>
        <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='text-base font-semibold uppercase tracking-wider text-indigo-600'>
            Recent Proposals
          </h2>
          <ProposalList />
        </div>
      </div>
      <div className='relative py-16 bg-white'>
        <div
          className='hidden absolute top-0 inset-x-0 h-1/2 bg-gray-50 lg:block'
          aria-hidden='true'
        />
        <div className='max-w-7xl mx-auto bg-indigo-600 lg:bg-transparent lg:px-8'>
          <div className='lg:grid lg:grid-cols-12'>
            <div className='relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent'>
              <div
                className='absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden'
                aria-hidden='true'
              />
              <div className='max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0'>
                <div className='aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1'>
                  <img
                    className='object-cover object-center rounded-3xl shadow-2xl'
                    src='https://images.unsplash.com/photo-1525026198548-4baa812f1183?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80'
                    alt=''
                  />
                </div>
              </div>
            </div>

            <div className='relative bg-indigo-600 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center'>
              <div
                className='hidden absolute inset-0 overflow-hidden rounded-3xl lg:block'
                aria-hidden='true'
              >
                <svg
                  className='absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0'
                  width={404}
                  height={384}
                  fill='none'
                  viewBox='0 0 404 384'
                  aria-hidden='true'
                >
                  <defs>
                    <pattern
                      id='64e643ad-2176-4f86-b3d7-f2c5da3b6a6d'
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits='userSpaceOnUse'
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className='text-indigo-500'
                        fill='currentColor'
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={384}
                    fill='url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)'
                  />
                </svg>
                <svg
                  className='absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2'
                  width={404}
                  height={384}
                  fill='none'
                  viewBox='0 0 404 384'
                  aria-hidden='true'
                >
                  <defs>
                    <pattern
                      id='64e643ad-2176-4f86-b3d7-f2c5da3b6a6d'
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits='userSpaceOnUse'
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className='text-indigo-500'
                        fill='currentColor'
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={384}
                    fill='url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)'
                  />
                </svg>
              </div>
              <div className='relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6'>
                <h2
                  className='text-3xl font-extrabold text-white'
                  id='join-heading'
                >
                  Join the Movement
                </h2>
                <p className='text-lg text-white'>
                  Varius facilisi mauris sed sit. Non sed et duis dui leo,
                  vulputate id malesuada non. Cras aliquet purus dui laoreet
                  diam sed lacus, fames.
                </p>
                <a
                  className='block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-indigo-700 hover:bg-gray-50 sm:inline-block sm:w-auto'
                  href='/login'
                >
                  Sign up your DAO
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
