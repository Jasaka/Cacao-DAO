import React from "react"
import {
  LibraryIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  CashIcon,
  LinkIcon
} from "@heroicons/react/outline"
import ProposalList from "../proposal/ProposalList"
import useProposals from "../../hooks/proposals/useProposals"
import Link from "next/link"
import { useSession } from "next-auth/react"
import AppSettings from "../../data/settings"
import Image from "next/image"

const features = [
  {
    name: "Fairness Secured",
    description:
      "Open source platform built on principles of transparency and fairness",
    icon: ShieldCheckIcon
  },
  {
    name: "Completely Free",
    description:
      "No fees for users – all costs covered by "+ AppSettings.content.organizationName,
    icon: CashIcon
  },
  {
    name: "Smart Voting",
    description:
      "Quadratic voting to ensure that every vote counts",
    icon: LibraryIcon
  },
  {
    name: "Persisted on the blockchain",
    description:
      "Transparent voting process facilitated via smart contract on Ethereum blockchain",
    icon: LinkIcon
  },
  {
    name: "Social Change",
    description:
      "Powered by the community. View results of past cycles and stay informed about upcoming proposals",
    icon: RefreshIcon
  },
  {
    name: "Forever on Arweave",
    description:
      "Proposals saved permanently on Arweave with version history",
    icon: ServerIcon
  }
]

export default function LandingFunnel() {
  const [proposalsAreLoading, proposalError, proposals] = useProposals()
  const { data: session, status } = useSession()

  return (
    <>
      <div className="relative bg-white py-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-600">
            Be a part of the solution
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Take control of your vote – join {AppSettings.content.organizationName}&apos;s platform today
          </p>
          <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500 py-16">

            Welcome to {AppSettings.content.organizationName}&apos;s platform for trustless voting on community proposals.
            Our platform is built on the principles of transparency and fairness, and we use quadratic voting to ensure
            that every vote counts.
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span
                          className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">

            Proposals are saved permanently on Arweave, and their version history is also retained, so you can be
            confident that you know exactly what you&apos;re voting on. Voting is facilitated via a smart contract on the
            Ethereum blockchain, so the whole process is transparent and easy to understand.
            <br /><br />
            <Link href={"/login"}><a className={"text-indigo-500 hover:text-indigo-700"}>Signing up</a></Link> is easy – simply connect your MetaMask wallet and you&apos;re ready to start casting your votes. And
            don&apos;t worry about fees – we cover all costs, so you can focus on making your voice heard.
            <br /><br />
            See the results of past cycles and stay informed about upcoming proposals.
            Join {AppSettings.content.organizationName}&apos;s platform for trustless voting today and make your voice heard.
          </p>
        </div>
      </div>
      {proposals && (proposals.length > 0) && (
        <div className="relative">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 pb-16">
            <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-600">
              Recent Proposals
            </h2>
            <ProposalList />
          </div>
        </div>)}
      <div className="relative py-16 bg-white">
        <div
          className="hidden absolute top-0 inset-x-0 h-1/2 bg-gray-50 lg:block"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto bg-indigo-600 lg:bg-transparent lg:px-8">
          <div className="lg:grid lg:grid-cols-12">
            <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
              <div
                className="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden"
                aria-hidden="true"
              />
              <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
                <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                  <Image
                    layout={"fill"}
                    className="object-cover object-center rounded-3xl shadow-2xl"
                    src="/sign-up.avif"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div
              className="relative bg-indigo-600 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
              <div
                className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block"
                aria-hidden="true"
              >
                <svg
                  className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
                  width={404}
                  height={384}
                  fill="none"
                  viewBox="0 0 404 384"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-indigo-500"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={384}
                    fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                  />
                </svg>
                <svg
                  className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
                  width={404}
                  height={384}
                  fill="none"
                  viewBox="0 0 404 384"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-indigo-500"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={384}
                    fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                  />
                </svg>
              </div>
              <div
                className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
                <h2
                  className="text-3xl font-extrabold text-white"
                  id="join-heading"
                >
                  Make your voice heard – Sign up now!
                </h2>
                <p className="text-lg text-white max-w-64">
                  With {AppSettings.content.organizationName}&apos;s platform, your vote will have a real impact on community
                  proposals. Be a part of change.
                </p>
                <Link href={"/login"}>
                  <a
                    className="block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-indigo-700 hover:bg-gray-50 sm:inline-block sm:w-auto"
                  >
                    Sign in to participate!
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
