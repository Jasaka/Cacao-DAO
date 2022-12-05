import React, { useEffect } from "react"
import { Disclosure } from "@headlessui/react"
import { classNames } from "../../util/classNames"
import Link from "next/link"
import { useSession } from "next-auth/react"

const navigations = [
  { name: "Home", href: "/", onlyLoggedIn: false, onlyAdmin: false, current: false },
  { name: "Townsquare", href: "/", onlyLoggedIn: true, onlyAdmin: false, current: false },
  { name: "Proposals", href: "/proposals", onlyLoggedIn: true, onlyAdmin: false, current: false },
  { name: "Voting", href: "/voting", onlyLoggedIn: true, onlyAdmin: false, current: false },
  { name: "Decisions", href: "/decisions", onlyLoggedIn: true, onlyAdmin: false, current: false },
  { name: "FAQ", href: "/faq", onlyLoggedIn: false, onlyAdmin: false, current: false },
  { name: "FAQ", href: "/faq", onlyLoggedIn: true, onlyAdmin: false, current: false },
  { name: "Admin", href: "/admin", onlyLoggedIn: true, onlyAdmin: true, current: false }
]

interface NavigationProps {
  displaySize: "small" | "large";
  currentView: string;
}

export default function Navigation(props: NavigationProps) {
  const [navigation, setNavigation] = React.useState([navigations[0]])
  const { data: session, status } = useSession()

  const currentViewIndex = navigation.findIndex(
    (view) => view.name === props.currentView
  )
  if (currentViewIndex !== -1) {
    navigation[currentViewIndex].current = true
  }

  useEffect(() => {
    const newNavigation: any = []
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
  }, [session, status])

  if (props.displaySize === "large") {
    return (
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <a
                key={item.name}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "px-3 py-2 rounded-md text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
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
            key={item.name}
            as="a"
            href={item.href}
            className={classNames(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block px-3 py-2 rounded-md text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
    )
  }
}
