'use client'

import { useAccount, useChainId, useNetwork } from 'wagmi'
import { CustomConnectButton } from './CustomConnectButton'
import MintNPCButton from './MintNPCButton'
import Image from 'next/image'
import { generateNoun } from '@/utils/svg'
import { goerli } from 'viem/chains'
import Link from 'next/link'

export default function HeroComponent() {
   const { isConnected, address } = useAccount()
   const { chain, chains } = useNetwork()
   console.log(chain, chains)
   const hasNPC = isConnected && false // need NPC data
   return (
      <div className='w-screen flex sm:flex-row flex-col items-center p-4 sm:p-12 sm:gap-x-6 sm:gap-y-0 gap-y-1 mb-4 border-b border-gray-300 bg-[#0A10A6]'>
         <div className='flex flex-col gap-y-2'>
            <div className={`flex flex-col gap-y-0`}>
               <div className='pp-sans font-bold text-white text-8xl leading-[0.75]'>
                  Noun Playable Citizens
               </div>
               <div className='pp-mono text-white text-3xl'>
                  Own, Collect, Participate
               </div>
            </div>
            <MintNPCButton />
         </div>
         <Image
            width={300}
            height={300}
            alt={'noun'}
            src={generateNoun()}
            className='-mt-8'
         />
      </div>
   )
}
