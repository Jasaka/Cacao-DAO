import "../../styles/globals.css"
import "../components/voting/QuadraticVoting/voting.css"
import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import { QueryClient, QueryClientProvider } from "react-query"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider
})

function CacaoDaoApp({ Component, pageProps }: AppProps<{session: Session}>) {
  const queryClient = new QueryClient()

  return (
    <RecoilRoot>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={60}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </SessionProvider>
      </WagmiConfig>
    </RecoilRoot>
  )
}

export default CacaoDaoApp
