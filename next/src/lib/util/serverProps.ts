import { getCsrfToken } from "next-auth/react"

export default async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    }
  }
}