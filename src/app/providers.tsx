'use client'

import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { base } from 'viem/chains'

const { chains, publicClient } = configureChains(
   [base],
   [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID_BASE ?? '' }),
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
      <WagmiConfig config={wagmiConfig}>
         <RainbowKitProvider chains={chains} initialChain={mainnet}>
            {mounted && children}
            <Analytics />
         </RainbowKitProvider>
      </WagmiConfig>
   )
}
