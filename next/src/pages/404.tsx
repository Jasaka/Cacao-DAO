import React from 'react';
import Layout from "../components/layout/Layout"

export default function Page404() {
  return (
    <Layout view={"Page not found"} pageTitle={"dOrg Page not found"}>
      <div className='min-h-full pt-16 pb-12 flex flex-col bg-white'>
        <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex-shrink-0 flex justify-center'>
            <a href='/src/pages' className='inline-flex'>
              <span className='sr-only'>Workflow</span>
              <img
                className='h-12 w-auto'
                src='img/logo.svg'
                alt=''
              />
            </a>
          </div>
          <div className='py-16'>
            <div className='text-center'>
              <p className='text-sm font-semibold text-indigo-600 uppercase tracking-wide'>
                404 error
              </p>
              <h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
                Page not found.
              </h1>
              <p className='mt-2 text-base text-gray-500'>
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className='mt-6'>
                <a
                  href='/src/pages'
                  className='text-base font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Go back home<span aria-hidden='true'> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </main>
        <footer className='flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='flex justify-center space-x-4'>
            <a
              href='mailto:support@cacao-dao.org'
              className='text-sm font-medium text-gray-500 hover:text-gray-600'
            >
              Contact Support
            </a>
            <span
              className='inline-block border-l border-gray-300'
              aria-hidden='true'
            />
            <a
              href='https://github.com/Jasaka/Cacao-DAO'
              className='text-sm font-medium text-gray-500 hover:text-gray-600'
            >
              GitHub
            </a>
          </nav>
        </footer>
      </div>
    </Layout>
  );
}
