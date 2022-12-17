import useGet from "../core/query/useGet"

export default function useProposal(id: string) {
  const [ isLoading, error,  data] = useGet({"url":`/proposals/${id}`,"queryKey":`proposal-${id}`,"responseType":"json"})

  return [isLoading, error, data]
}