import React from 'react';
import { Disclosure } from '@headlessui/react';
import {classNames} from "../../util/util";

const navigation = [
  { name: 'Townsquare', href: '/', current: false },
  { name: 'Proposals', href: '/proposals', current: false },
  { name: 'Voting', href: '/voting', current: false },
  { name: 'Projects pending funding', href: '/pending', current: false },
  { name: 'Funded Projects', href: '/projects', current: false },
];

interface NavigationProps {
  displaySize: 'small' | 'large';
  currentView: string;
}

export default function Navigation(props: NavigationProps) {
  let result;

  const currentViewIndex = navigation.findIndex(
    (view) => view.name === props.currentView,
  );
  if (currentViewIndex !== -1) {
    navigation[currentViewIndex].current = true;
  }

  if (props.displaySize === 'large') {
    result = (
      <div className='hidden md:block'>
        <div className='ml-10 flex items-baseline space-x-4'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'px-3 py-2 rounded-md text-sm font-medium',
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    );
  } else {
    result = (
      <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as='a'
            href={item.href}
            className={classNames(
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
    );
  }

  return result;
}
