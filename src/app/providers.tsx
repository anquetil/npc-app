'use client'

import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { WagmiProvider, http } from 'wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

import { base, sepolia } from 'viem/chains'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import { isTestNet } from '@/utils/chainFuncs'

const client = new ApolloClient({
   uri:
      process.env.NEXT_PUBLIC_LOCAL
         ? 'http://localhost:42069'
         : process.env.NEXT_PUBLIC_GRAPHQL_API_SEPOLIA,
   cache: new InMemoryCache(),
})

const config = getDefaultConfig({
   appName: 'Noms',
   projectId: '02262c474a049993f0929419826f7bfb',
   chains: [isTestNet() ? sepolia : base],
   transports: {
      [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_BASE}`),
      [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY_SEPOLIA}`),
   },
   ssr: true,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
   const [mounted, setMounted] = React.useState(false)
   React.useEffect(() => setMounted(true), [])
   return (
      <ApolloProvider client={client}>
         <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
               <RainbowKitProvider>
                  <div className='flex flex-col'>{mounted && children}</div>
                  <Analytics />
               </RainbowKitProvider>
            </QueryClientProvider>
         </WagmiProvider>
      </ApolloProvider>
   )
}
