import React from "react"
import { Disclosure } from "@headlessui/react"
import Navigation from "../../navigation/Navigation"
import UserNavigation from "../../navigation/UserNavigation"
import { useSession } from "next-auth/react"
import LoginButton from "../../base/Button/LoginButton"
import { useRouter } from "next/router"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"


export default function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8" src="/img/logo.svg" alt="Workflow" />
                </div>
                <Navigation
                  displaySize={"large"}
                />
              </div>
              {session?.user && (
                <>
                  <UserNavigation displaySize={"large"} />
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button
                      className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </>
              )}
              {!session && <LoginButton className={"w-28"} onClick={() => router.push("/login")} label={"Login"} />}

            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <Navigation displaySize={"small"} />
            {!session && <LoginButton onClick={() => router.push("/login")} label={"Login"} />}
            {session?.user && <UserNavigation displaySize={"small"} />}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
