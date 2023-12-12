'use client'

import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { base, goerli } from 'viem/chains'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const testNet = process.env.NEXT_PUBLIC_TESTNET == 'TRUE'

const client = new ApolloClient({
   uri: testNet
      ? process.env.NEXT_PUBLIC_GRAPHQL_API_GOERLI
      : process.env.NEXT_PUBLIC_GRAPHQL_API_BASE,
   cache: new InMemoryCache(),
})

const { chains, publicClient } = configureChains(
   [testNet ? goerli : base],
   [
      alchemyProvider({
         apiKey:
            (testNet
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
