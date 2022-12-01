import { useQuery } from "react-query"
import axios from "axios"

export default function useProposals() {
  const { data, error, isLoading } = useQuery("proposals", () => {
    // axios call here
    axios.get(process.env.REACT_APP_API_HOST + "/proposals").then(res => res.data)
  })

  console.log("useProposals", isLoading, error, data)
  return [isLoading, error, data]
}