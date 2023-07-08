import useGet from "../core/query/useGet"

export default function useProposalFlags(id: string) {
  const [ isLoading, error,  data] = useGet({"url":`/proposals/${id}/flags`,"queryKey":`proposal-${id}-flags`,"responseType":"json"})

  return [isLoading, error, data]
}