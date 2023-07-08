import useGet from "../core/query/useGet"

export default function useProposalVersions(id: string) {
  const [ isLoading, error,  data] = useGet({"url":`/proposals/${id}/versions`,"queryKey":`proposal-${id}-versions`,"responseType":"json"})

  return [isLoading, error, data]
}