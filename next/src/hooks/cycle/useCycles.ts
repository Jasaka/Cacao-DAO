import useGet from "../core/query/useGet"


export default function useCycles() {
  const [ isLoading, error,  data] = useGet({"url":`/cycles`,"queryKey":`cycles`,"responseType":"json"})

  return [isLoading, error, data]
}