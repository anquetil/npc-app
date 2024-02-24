'use client'

import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { base, sepolia } from 'viem/chains'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { isTestNet } from '@/utils/chainFuncs'

// Todo: add to vercel env as 'NEXT_PUBLIC_GRAPHQL_API'
// https://npc-graph-ponder-production.up.railway.app/
const client = new ApolloClient({
   uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
   cache: new InMemoryCache(),
})

const { chains, publicClient } = configureChains(
   [isTestNet() ? sepolia : base],
   [
      alchemyProvider({
         apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY!,
      }),
      publicProvider(),
   ]
)

const { connectors } = getDefaultWallets({
   appName: 'Build-A-Noun',
   projectId: '02262c474a049993f0929419826f7bfb',
   chains,
})

export const wagmiConfig = createConfig({
   autoConnect: true,
   connectors,
   publicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
   const [mounted, setMounted] = React.useState(false)
   React.useEffect(() => setMounted(true), [])
   return (
      <ApolloProvider client={client}>
         <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} initialChain={chains[0]}>
               <div className='flex flex-col'>{mounted && children}</div>
               <Analytics />
            </RainbowKitProvider>
         </WagmiConfig>
      </ApolloProvider>
   )
}
