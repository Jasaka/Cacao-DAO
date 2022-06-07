import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment } from 'react';

import { XIcon } from '@heroicons/react/outline';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  const { isOpen } = props;

  const handleClose = () => {
    props.onClose();
  };

  if (!isOpen) {
    return null;
  } else {
    return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6'>
                  <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
                    <button
                      type='button'
                      className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onClick={() => handleClose()}
                    >
                      <span className='sr-only'>Close</span>
                      <XIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      {props.children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      // <div
      //   className={
      //     'absolute z-10 w-96 h-96 bg-lime-500 shadow-black flex flex-col'
      //   }
      // >
      //   <Button onClick={handleClose} label={'Close'} />
      //   <div>{props.children}</div>
      // </div>
    );
  }
}
