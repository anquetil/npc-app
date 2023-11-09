'use client'

import { useAccount } from 'wagmi'
import { CustomConnectButton } from './CustomConnectButton'

export default function HeroComponent() {
   const { isConnected, address } = useAccount()
   const hasNPC = isConnected && true
   return (
      <div className='flex flex-col gap-y-1'>
         {hasNPC ? (
            <div>{`here are your npcs`}</div>
         ) : (
            <button>{`Mint an NPC for 0.001 ETH`}</button>
         )}
         {!isConnected && <CustomConnectButton />}
      </div>
   )
}
