import useGet from "../core/query/useGet"


export default function useCurrentCycle() {
  const [ isLoading, error,  data] = useGet({"url":`/cycles?filter=current`,"queryKey":`current-cycle`,"responseType":"json"})

  return [isLoading, error, data]
}