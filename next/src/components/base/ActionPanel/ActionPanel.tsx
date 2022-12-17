import React from "react"

interface ActionPanelProps {
  title: string
  description: string
  buttonLabel: string
  onclick: () => void
  classNames?: string
}

export const ActionPanel = ({ title, description, buttonLabel, onclick, classNames }: ActionPanelProps) => {
  return (
    <div className={"bg-white max-w-xl shadow sm:rounded-lg " + classNames}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            {description}
          </p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            onClick={onclick}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}