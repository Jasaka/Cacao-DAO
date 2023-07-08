import React from "react"
import Avatar from "boring-avatars"

interface AvatarProps {
  userId: string;
  avatarUrl?: string
  size?: "sm" | "md" | "lg"
}

export const UserAvatar = ({ userId, avatarUrl, size }: AvatarProps) => {

  let avatarSize = 8
  if (size === "md") {
    avatarSize = 12
  } else if (size === "lg") {
    avatarSize = 16
  }

  if (avatarUrl) {
    return (
      <img
        className={"h-" + avatarSize + " w-" + avatarSize + " sm:rounded-full relative"}
        src={avatarUrl}
        alt={"Avatar for user " + userId}
      />
    )
  }

  return (
    <Avatar
      square={false}
      size={avatarSize * 4}
      name={userId}
      variant="bauhaus"
    />
  )
}