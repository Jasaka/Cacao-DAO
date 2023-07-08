import React from 'react';

interface LinkButtonProps {
  target: string;
  label: string;
  className?: string;
}

export default function LinkButton(props: LinkButtonProps) {
  const { target, label, className } = props;
  return (
    <a
      href={target}
      className={`${className} inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
    >
      {label}
    </a>
  );
}
