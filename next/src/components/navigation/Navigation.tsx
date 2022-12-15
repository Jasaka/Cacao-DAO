import React, { useEffect } from "react"
import { Disclosure } from "@headlessui/react"
import { classNames } from "../../util/classNames"
import Link from "next/link"
import { useSession } from "next-auth/react"
import useNavigation from "../../hooks/useNavigation"
import { Navigation as NavigationsProps } from "../../models/navigation"


interface NavigationProps {
  displaySize: "small" | "large";
  currentView: string;
}

export default function Navigation(props: NavigationProps) {
  const [navigationIsLoading, navigationError, navigations] = useNavigation()
  const [navigation, setNavigation] = React.useState([] as NavigationsProps[])
  const { data: session, status } = useSession()


  useEffect(() => {
    if(!navigationIsLoading && !navigationError) {
    const newNavigation: NavigationsProps[] = []
    if (session?.user) {
      navigations.map((nav) => {
        if (nav.onlyLoggedIn && !nav.onlyAdmin) {
          newNavigation.push(nav)
        }
        if (nav.onlyLoggedIn && nav.onlyAdmin && session?.user?.isAdmin) {
          newNavigation.push(nav)
        }
      })
    } else {
      navigations.map((nav) => {
        if (!nav.onlyLoggedIn) {
          newNavigation.push(nav)
        }
      })
    }
    setNavigation(newNavigation)
  }}, [session, status, navigationIsLoading, navigationError, navigations])

  if (props.displaySize === "large") {
    return (
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {navigation.map((item) => (
            <Link key={item.label} href={item.url}>
              <a
                key={item.label}
                className={classNames(
                  false//item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "px-3 py-2 rounded-md text-sm font-medium"
                )}
                //aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.label}
            as="a"
            href={item.url}
            className={classNames(
              false//item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block px-3 py-2 rounded-md text-base font-medium"
            )}
            //aria-current={item.current ? "page" : undefined}
          >
            {item.label}
          </Disclosure.Button>
        ))}
      </div>
    )
  }
}
