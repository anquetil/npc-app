'use client'

import React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { base, baseGoerli } from 'viem/chains'

const testNet = process.env.NEXT_PUBLIC_TESTNET == 'TRUE'

const { chains, publicClient } = configureChains(
   [testNet ? baseGoerli : base],
   [
      alchemyProvider({
         apiKey:
            (testNet
               ? process.env.NEXT_PUBLIC_ALCHEMY_KEY_BASE_GOERLI
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
      <WagmiConfig config={wagmiConfig}>
         <RainbowKitProvider chains={chains} initialChain={mainnet}>
            <div className='flex flex-col'>{mounted && children}</div>
            <Analytics />
         </RainbowKitProvider>
      </WagmiConfig>
   )
}
