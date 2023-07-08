import useGet from "../core/query/useGet"

export default function useProposalVotes(id: string) {
  const [ isLoading, error,  data] = useGet({"url":`/proposals/${id}/votes`,"queryKey":`proposal-${id}-votes`,"responseType":"json"})

  return [isLoading, error, data]
}