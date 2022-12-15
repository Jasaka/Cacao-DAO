import type { NextPage } from "next"
import Layout from "../components/layout/Layout"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import axios from "axios"

const Profile: NextPage = () => {
  const { data: session, status } = useSession()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [about, setAbout] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const userMutation = useMutation({
    mutationFn: (updatedUser): any => {
      return axios.put("/api/users", updatedUser)
    }
  })

  useEffect(() => {
    if (session) {
      setUsername(session.user.name!)
      setEmail(session.user.email!)
      setAbout(session.user.about!)
      setImageUrl(session.user.imageUrl!)
    }
  }, [session])

  if (status === "loading" || !session) {
    return <div>Loading...</div>
  }

  return (
    <Layout view={"Profile"} pageTitle={"dOrg Profile"}>
      <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
        {/* Profile section */}
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg font-medium leading-6 text-gray-900">Profile</h2>
            {session?.user.isNew && (
              <>
                <h3 className="pt-8 text-md font-medium leading-6 text-blue-700">
                  We are happy that you joined!
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please fill out your profile so everyone knows what you are all about!
                </p>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span
                    className="inline-flex items-center w-36 rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-gray-500 sm:text-sm">
                      cacao-dao.org/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-700 focus:ring-sky-500 sm:text-sm bg-white"
                    placeholder={!username ? session.user.walletId : username}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder={!email ? "you@example.com" : email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                            placeholder={!about ? "I am new and want to contribute!" : about}
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                          />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your profile.
                </p>
              </div>
            </div>

            <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
              <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                Avatar
              </p>
              <div className="mt-1 lg:hidden">
                <div className="flex items-center">
                  <div
                    className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                    aria-hidden="true"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-full w-full rounded-full" src={imageUrl}
                         alt={"Avatar of User " + username} />
                  </div>
                  <div className="ml-5 rounded-md shadow-sm">
                    <div
                      className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:bg-gray-50">
                      <label
                        htmlFor="mobile-user-photo"
                        className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                      >
                        <span>Change</span>
                        <span className="sr-only">User Avatar</span>
                      </label>
                      <input
                        id="mobile-user-photo"
                        name="user-photo"
                        type="file"
                        className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative hidden overflow-hidden rounded-full lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="relative h-40 w-40 rounded-full" src={imageUrl} alt="" />
                <label
                  htmlFor="desktop-user-photo"
                  className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                >
                  <span>Change</span>
                  <span className="sr-only"> user photo</span>
                  <input
                    type="file"
                    id="desktop-user-photo"
                    name="user-photo"
                    className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                  />
                </label>
              </div>
            </div>
          </div>


        </div>
      </form>
      <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
        <div className={"flex flex-grow-1 justify-start"}>Bla</div>
        <Link href="/">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          onClick={() => {
            // @ts-ignore TODO: figure this out
            userMutation.mutate({
              name: username,
              imageUrl: imageUrl,
              about: about,
              email: email,
              walletId: session.user.walletId
            })
          }}
          className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>

    </Layout>
  )
}

export { default as getServerSideProps } from "../lib/serverProps"
export default Profile
