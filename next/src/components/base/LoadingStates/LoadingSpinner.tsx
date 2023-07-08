import React from "react"

interface LoadingSpinnerProps {
  message?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export default function LoadingSpinner({ message, size }: LoadingSpinnerProps) {
  let avatarSize = 32
  if (size === "md") {
    avatarSize = 12
  } else if (size === "lg") {
    avatarSize = 16
  } else if (size === "sm") {
    avatarSize = 8
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className={"animate-spin rounded-full h-"+avatarSize+" w-"+avatarSize+" border-b-2 border-indigo-500"} />
      <div className="sr-only mt-4 text-xl">{message ?? "Loading..."}</div>
    </div>
  )
}
