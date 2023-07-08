import React, { ReactNode } from "react"
import { LoadingLine } from "../LoadingStates/LoadingLine"

interface StatProps {
  name: string
  stat?: string
  isLoading: boolean
  isError: boolean
}

interface StatDisplayProps {
  title: string
  stats: StatProps[]
}

export const AdminStatDisplay = ({ stats, title }: StatDisplayProps) => {

  function StatGroup({ isLoading, isError, name, stat = "" }: StatProps) {

    if (isLoading) {
      return (
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">{name}</dt>
          <dd className="mt-1"><LoadingLine height={"lg"} /></dd>
        </div>
      )
    }

    if (Object.getPrototypeOf(stat) === Object.prototype) {
      return (
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">{name}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Gathering Proposals</dd>
        </div>
      )
    }

    return (
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">{name}</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stat}</dd>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => {
          return (
            <StatGroup
              key={item.name}
              name={item.name}
              stat={item.stat}
              isLoading={item.isLoading}
              isError={item.isError}
            />
          )
        })}
      </dl>
    </div>
  )
}