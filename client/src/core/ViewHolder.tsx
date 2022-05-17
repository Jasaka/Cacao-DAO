import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTitle } from '../hooks/useTitle';

interface ViewHolderProps {
  view: string;
  pageTitle?: string;
  pageHeading?: string;
  actionButton?: {
    label: string;
    target: string;
  };
  children: React.ReactNode;
}

export default function ViewHolder(props: ViewHolderProps) {
  if (props.pageTitle) useTitle(props.pageTitle);

  return (
    <>
      <Header currentView={props.view} />
      <div className='min-h-full'>
        {props.pageHeading ? (
          <header className='bg-white shadow'>
            <div className='flex justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold text-gray-900'>{props.view}</h1>
              {props.actionButton ? (
                <a
                  href={props.actionButton.target}
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {props.actionButton.label}
                </a>
              ) : null}
            </div>
          </header>
        ) : null}
        <main>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
            {props.children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
