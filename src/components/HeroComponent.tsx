'use client'

import { useNetwork } from 'wagmi'
import MintNPCButton from './MintNPCButton'
import Image from 'next/image'
import { generateNoun } from '@/utils/svg'

export default function HeroComponent() {
   // const { isConnected } = useAccount()
   const { chain, chains } = useNetwork()
   // const hasNPC = isConnected && false // need NPC data
   return (
      <div className='w-screen flex sm:flex-row flex-col items-center p-4 sm:p-12 sm:gap-x-6 sm:gap-y-0 gap-y-1 mb-4 border-b border-gray-300   bg-[#0A10A6]'>
         <div className='flex flex-col gap-y-2'>
            <div className={`flex flex-col gap-y-0`}>
               <div className='pp-sans font-bold text-[#e8eafd] text-8xl leading-[0.75]'>
                  Noun Playable Characters
               </div>
               <div className='pp-mono text-gray-100  text-[#cecfed] text-3xl'>
                  Collect, Create, Vote
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
