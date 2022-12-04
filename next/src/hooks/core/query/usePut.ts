import useAxiosQuery from "./useQuery"

interface UsePutProps {
  url: string;
  queryKey: string;
  responseType?: any;
  needsAuth?: boolean;
  payload: any;
}

export default function usePut({ url, queryKey, payload, needsAuth = true, responseType }: UsePutProps) {
  const [
    isLoading,
    error,
    data
  ] = useAxiosQuery({
    url: url,
    queryKey: queryKey,
    responseType: responseType,
    needsAuth: needsAuth,
    method: "put",
    payload: payload
  })

  return [isLoading, error, data]
}