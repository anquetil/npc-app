'use client'

import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { base, goerli } from 'viem/chains'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { isTestNet } from '@/utils/chainFuncs'

const client = new ApolloClient({
   uri: process.env.NODE_ENV == "production"
      ? process.env.NEXT_PUBLIC_GRAPHQL_API_GOERLI
      : "http://localhost:42069",
   cache: new InMemoryCache(),
})

const { chains, publicClient } = configureChains(
   [isTestNet() ? goerli : base],
   [
      alchemyProvider({
         apiKey:
            (isTestNet()
               ? process.env.NEXT_PUBLIC_ALCHEMY_KEY_GOERLI
               : process.env.NEXT_PUBLIC_ALCHEMY_ID_BASE) ?? '',
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
