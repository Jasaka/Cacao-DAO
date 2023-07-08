import useGet from "../core/query/useGet"

export default function useUser(id: string, enabled: boolean = true) {
  const [ isLoading, error,  data] = useGet({"url":"/users/"+id,"queryKey":"user-"+id,"responseType":"json", enabled: enabled})

  return [isLoading, error, data]
}