import useAxiosQuery from "./useQuery"

interface UsePostProps {
  url: string;
  queryKey: string;
  responseType?: any;
  needsAuth?: boolean;
  payload: any;
}

export default function usePost({ url, queryKey, payload, needsAuth = true, responseType }: UsePostProps) {
  const [
    isLoading,
    error,
    data
  ] = useAxiosQuery({
    url: url,
    queryKey: queryKey,
    responseType: responseType,
    needsAuth: needsAuth,
    method: "post",
    payload: payload
  })

  return [isLoading, error, data]
}