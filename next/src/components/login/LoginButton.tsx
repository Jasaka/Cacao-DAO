import React from "react"
import { useSession } from "next-auth/react"

export default function LoginButton() {
  const { data: session, status } = useSession()

  return (
    <div>
      <button>Sign in</button>
    </div>
  )
}