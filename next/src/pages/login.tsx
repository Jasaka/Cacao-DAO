import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import React, { useEffect } from "react"
import { getCsrfToken, signIn, useSession } from "next-auth/react"
import { InjectedConnector } from "@wagmi/core"
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi"
import { SiweMessage } from "siwe"
import LoginButton from "../components/base/Button/LoginButton"
import StepList from "../components/login/StepList"


const Login: NextPage = () => {
  const { signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector()
  })
  const { data: session, status } = useSession()


  const handleSignIn = async () => {
    try {
      const callbackUrl = "/"
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in to CacaoDao",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken()
      })
      const signature = await signMessageAsync({ message: message.prepareMessage() })
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: true,
        signature,
        callbackUrl
      })
    } catch (error) {
    }
  }

  useEffect(() => {
    if (isConnected && !session) {
      handleSignIn()
    }
  }, [isConnected])

  return (
    <Layout view={"Login"} pageTitle={"dOrg Login"}>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/img/logo.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div>
            <LoginButton
              onClick={() => {
                if (!isConnected) {
                  connect()
                  handleSignIn()
                } else {
                  handleSignIn()
                }
              }}
              label={"Sign in with MetaMask"}
            />
          </div>
          <div className={"pt-8"}>
            <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-300" />
            <h2 className="mt-6 pb-8 text-center text-xl font-extrabold text-gray-900">
              Or sign up with Metamask
            </h2>
            <StepList />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/serverProps"

export default Login
