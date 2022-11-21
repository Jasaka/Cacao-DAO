import "../../styles/globals.css"
import '../components/voting/QuadraticVoting/voting.css';
import type {AppProps} from "next/app"
import {RecoilRoot} from "recoil";
import { QueryClientProvider } from "@tanstack/react-query/src/QueryClientProvider"
import { QueryClient } from "@tanstack/query-core"

function MyApp({Component, pageProps}: AppProps) {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default MyApp
