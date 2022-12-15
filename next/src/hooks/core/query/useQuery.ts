import { useQuery } from "react-query"
import axios from "axios"
import { useSession } from "next-auth/react"

interface UseQueryProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  queryKey: string;
  needsAuth?: boolean;
  responseType?: "blob" | "arraybuffer" | "document" | "json" | "text" | "stream";
  payload?: any;
}

export default function useAxiosQuery({ url, queryKey, responseType, needsAuth, method, payload }: UseQueryProps): any {
  const { data: session, status } = useSession()
  console.log("session", session)
  let config: any


  switch (responseType) {
    case "blob":
      config = { responseType: "blob" }
      break
    case "arraybuffer":
      config = { responseType: "arraybuffer" }
      break
    case "document":
      config = { responseType: "document" }
      break
    case "json":
      config = { responseType: "json" }
      break
    case "text":
      config = { responseType: "text" }
      break
    case "stream":
      config = { responseType: "stream" }
      break
    default:
      break
  }

  let queryFunction: any

  switch (method) {
    case "get":
      queryFunction = () => axios.get(process.env.NEXT_PUBLIC_API_HOST + url, config).then(res => res.data)
      break
    case "post":
      queryFunction = () => axios.post(process.env.NEXT_PUBLIC_API_HOST + url, payload, config).then(res => res.data)
      break
    case "put":
      queryFunction = () => axios.put(process.env.NEXT_PUBLIC_API_HOST + url, payload, config).then(res => res.data)
      break
    case "delete":
      queryFunction = () => axios.delete(process.env.NEXT_PUBLIC_API_HOST + url, config).then(res => res.data)
      break
    default:
      break
  }

  const {
    isLoading,
    error,
    data
  } = useQuery(queryKey, queryFunction)


  return [isLoading, error, data]
}