import useAxiosQuery from "./useQuery"

interface UseDeleteProps {
  url: string;
  queryKey: string;
  responseType?: any;
  needsAuth?: boolean;
}

export default function useDelete({ url, queryKey, needsAuth, responseType }: UseDeleteProps) {
  const [
    isLoading,
    error,
    data
  ] = useAxiosQuery({
    url: url,
    queryKey: queryKey,
    responseType: responseType,
    needsAuth: needsAuth,
    method: "delete"
  })

  return [isLoading, error, data]
}