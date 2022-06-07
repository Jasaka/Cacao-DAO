import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useTitle } from '../hooks/useTitle';
import LinkButton from '../components/Button/LinkButton';

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
                <LinkButton
                  target={props.actionButton.target}
                  label={props.actionButton.label}
                />
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
