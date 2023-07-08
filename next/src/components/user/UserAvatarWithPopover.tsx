import { User } from "../../models/user"
import useUser from "../../hooks/users/useUser"
import { UserAvatar } from "./UserAvatar"
import LoadingSpinner from "../base/LoadingStates/LoadingSpinner"
import { useState } from "react"
import Avatar from "boring-avatars"

interface UserPopoverProps {
  userId: string

  avatarSize?: "sm" | "md" | "lg"
  type?: "top" | "bottom" | "no"
}

export const UserAvatarWithPopover = ({ userId, avatarSize = "sm", type = "bottom" }: UserPopoverProps) => {
  const [userIsLoading, userError, user] = useUser(userId)
  let margin = " mt-4 -ml-24"
  if (type === "top") {
    margin = " -mt-64 -ml-24"
  }

  if (userIsLoading) {
    return <LoadingSpinner size={avatarSize} />
  }

  if (userError) {
    return <UserAvatar userId={userId} size={avatarSize} />
  }

  if (type === "no") {
    return (
      <div className={"flex flex-col text-center font-semibold justify-center items-center"}>
        <UserAvatar userId={userId} avatarUrl={user.imageUrl} size={avatarSize} />
        <p>{user.name}</p>
      </div>
    )
  }


  return (
      <div className={"group inline relative"}>
        <UserAvatar userId={userId} avatarUrl={user.imageUrl} size={avatarSize} />
        <div role="tooltip" aria-hidden="true"
             className={"text-white absolute rounded invisible group-focus:visible group-hover:visible overflow-x-visible z-20 w-48 shadow-xl border border-1 border-gray-600 bg-gray-800 " + margin}>
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <UserAvatar userId={userId} avatarUrl={user.imageUrl} size={"sm"} />
              <div>
                <p className="text-sm w-24 italic truncate font-light px-3 py-1.5">
                  {user.walletId}
                </p>
              </div>
            </div>
            <p className="text-base text-left font-semibold leading-none text-gray-900 dark:text-white">
              {user.name}
            </p>
            <p className="mb-3 mt-1 text-white text-left font-medium text-xs">
              {user.email}
            </p>
            <p className="mb-4 text-sm text-left font-normal">
              {user.about}
            </p>
            <ul className="flex text-sm font-light">
              <li className="mr-2">
                <span className="font-semibold text-gray-900 dark:text-white pr-1">12</span>
                <span>Proposals</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}