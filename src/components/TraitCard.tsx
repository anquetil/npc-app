'use client'
import { erc1155railsABI } from '@/abis/erc1155railsABI'
import { NPC } from '@/types/NPCType'
import { Trait } from '@/types/TraitType'
import { deploys } from '@/utils/addresses'
import { currentChainID } from '@/utils/chainFuncs'
import { dataTo64SVG } from '@/utils/svg'
import Image from 'next/image'
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi'

export default function TraitCard({ trait, npc }: { trait: Trait; npc: NPC }) {
   const { config: mintConfig } = usePrepareContractWrite({
      chainId: currentChainID(),
      address: deploys['Trait(1155)'] as Address,
      abi: erc1155railsABI,
      functionName: 'mintTo',
      args: [npc.id, BigInt(trait.id), 1n], //TBAaddress , tokenID, value (qty)
   })

   const { write: mint, data, isSuccess: sentTransaction } = useContractWrite(mintConfig)
   if (sentTransaction) {
      console.log('sentTransaction: ', data)
   }

   return (
      <div className='ease-in-out hover:bg-slate-50 m-1  transition-all border-gray-50 '>
         <Image
            width={112}
            height={112}
            alt={trait.name}
            src={dataTo64SVG(trait.rleBytes)}
         />
         <button
            onClick={() => {
               mint?.()
            }} 
            className='px-2 py-1 mr-2 border bg-white hover:bg-gray-50'
         >
            Mint
         </button>
         <button
            className='px-2 py-1 border bg-white hover:bg-gray-50'

         >Equip</button>
      </div>
   )
}
