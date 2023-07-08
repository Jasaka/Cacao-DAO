import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { onClick, label, className } = props;
  return (
    <button
      className={`${className} inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
