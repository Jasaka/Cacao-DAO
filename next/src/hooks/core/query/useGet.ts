import useAxiosQuery from "./useQuery"

interface UseGetProps {
  url: string;
  queryKey: string;
  responseType?: any;
  needsAuth?: boolean;
  enabled?: boolean;
}

export default function useGet({ url, queryKey, needsAuth = false, responseType = "json", enabled }: UseGetProps) {
  const [
    isLoading,
    error,
    data
  ] = useAxiosQuery({
    url: url,
    queryKey: queryKey,
    responseType: responseType,
    needsAuth: needsAuth,
    method: "get",
    enabled: enabled
  })

  return [isLoading, error, data]
}