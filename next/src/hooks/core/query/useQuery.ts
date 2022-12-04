import { useQuery } from "react-query"
import axios from "axios"
import { contextState } from "../../../atoms/ContextAtom"
import { useRecoilValue } from "recoil"

interface UseQueryProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  queryKey: string;
  needsAuth?: boolean;
  responseType?: "blob" | "arraybuffer" | "document" | "json" | "text" | "stream";
  payload?: any;
}

export default function useAxiosQuery({ url, queryKey, responseType, needsAuth, method, payload }: UseQueryProps): any {
  const context = useRecoilValue(contextState)

  let config: any

  if (needsAuth) {
    config = {
      headers: {
        Authorization: "Bearer " + context.token
      }
    }
  }

  switch (responseType) {
    case "blob":
      config = { ...config, responseType: "blob" }
      break
    case "arraybuffer":
      config = { ...config, responseType: "arraybuffer" }
      break
    case "document":
      config = { ...config, responseType: "document" }
      break
    case "json":
      config = { ...config, responseType: "json" }
      break
    case "text":
      config = { ...config, responseType: "text" }
      break
    case "stream":
      config = { ...config, responseType: "stream" }
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