import React from 'react';
import Header from "./Header/Header";
import LinkButton from "../base/Button/LinkButton";
import Footer from "./Footer/Footer";
import Head from "next/head";

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

export default function Layout(props: ViewHolderProps) {

  return (
    <>
      <Head>
        <title>{props.pageTitle || "dOrg"}</title>
        <meta name="description" content="dOrg helps you decentralise your decisionmaking process." />
        <link rel="icon" href="img/logo.svg" />
      </Head>
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
