import useGet from "./core/query/useGet"
import { Navigation } from "../models/navigation"

export default function useNavigation(): [boolean, any, Navigation[]] {
  const [ isLoading, error, data] = useGet({"url":"/navigation","queryKey":"navigation","responseType":"json"})

  return [isLoading, error, data]
}