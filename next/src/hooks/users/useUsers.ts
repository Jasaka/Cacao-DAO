import useGet from "../core/query/useGet"

export default function useUsers() {
  const [ isLoading, error,  data] = useGet({"url":"/users","queryKey":"users","responseType":"json"})

  return [isLoading, error, data]
}