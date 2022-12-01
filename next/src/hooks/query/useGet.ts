import useAxiosQuery from "./useQuery"

interface UseGetProps {
  url: string;
  queryKey: string;
  responseType?: any;
  needsAuth?: boolean;
}

export default function useGet({ url, queryKey, needsAuth = false, responseType = "json" }: UseGetProps) {
  const {
    isLoading,
    error,
    data
  } = useAxiosQuery({
    url: url,
    queryKey: queryKey,
    responseType: responseType,
    needsAuth: needsAuth,
    method: "get"
  })

  console.log("useGet", isLoading, error, data)
  console.log("isLoading", isLoading)
  console.log("error", error)
  console.log("data", data)

  return [isLoading, error, data]
}