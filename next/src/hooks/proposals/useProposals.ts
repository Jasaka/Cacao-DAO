import useGet from "../core/query/useGet"

export default function useProposals() {
  const [ isLoading, error,  data] = useGet({"url":"/proposals","queryKey":"proposals","responseType":"json"})

  return [isLoading, error, data]
}