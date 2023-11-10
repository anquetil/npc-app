'use client'

import { useAccount } from 'wagmi'
import { CustomConnectButton } from './CustomConnectButton'
import MintNPCButton from './MintNPCButton'

export default function HeroComponent() {
   const { isConnected, address } = useAccount()
   const hasNPC = isConnected && false // need NPC data
   return (
      <div className='flex sm:flex-row flex-col sm:gap-x-6 sm:gap-y-0 gap-y-1 mb-4'>
         {isConnected ? (
            hasNPC ? (
               <div>{`Here are your npcs`}</div>
            ) : (
               <MintNPCButton />
            )
         ) : (
            <CustomConnectButton />
         )}
         <div className='font-londrina font-light text-gray-500'>
            <div>1. Mint an NPC (Noun Playable Citizen)</div>
            <div>2. Collect some traits</div>
            <div>3. Equip your Noun with as many traits as you want!</div>
            <div>4. Explore the Nouniverse with your Noun - vote, propose, bid!</div>
         </div>
      </div>
   )
}
