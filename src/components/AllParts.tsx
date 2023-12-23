'use client'

import PartForPurchase from './PartForPurchase'
import { useState } from 'react'
import { useCartStore } from '@/stores/useCartStore'
import { categories, dataTo64SVG } from '@/utils/svg'
import useGetAllTraits from '@/hooks/useGetAllTraits'
import Image from 'next/image'
import { NPC } from '@/types/NPCType'
import { currentChainID } from '@/utils/chainFuncs'
import { deploys } from '@/utils/addresses'
import { Address } from 'viem'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { erc1155railsABI } from '@/abis/erc1155railsABI'
import TraitCard from './TraitCard'

export default function AllParts({ npc }: { npc: NPC }) {
   const [tab, setTab] = useState<string>('Bodies')
   const activeCategory = categories.filter((c) => c.name == tab)[0]
   const addToCart = useCartStore((state) => state.add)
   const { items } = useCartStore()
   const { traits } = useGetAllTraits()

   const addAllCategory = () => {
      activeCategory.traits.map((t) => {
         const item = items.get(t.name)
         console.log(item)
         if (item == undefined || item == 0) addToCart(t.name)
      })
   }

   return (
      <div className='flex flex-col w-full shrink mr-4'>
         <div className='flex flex-row flex-wrap'>
            {traits && traits.map((t) => <TraitCard trait={t} npc={npc} key={t.name} />)}
         </div>
         <div className='flex flex-row gap-x-4 sm:gap-x-6 mb-4 w-full pp-sans text-3xl font-bold uppercase'>
            {categories.map((c) => (
               <div
                  key={c.name} // need a distinct id between tab
                  className={`${
                     c.name == tab
                        ? ' text-neutral-900 underline'
                        : 'text-neutral-400 hover:text-neutral-900'
                  } hover:cursor-pointer`}
                  onClick={() => {
                     setTab(c.name)
                  }}
               >
                  {c.name}
               </div>
            ))}
         </div>
         <button
            onClick={addAllCategory}
            className='p-1 px-2 border border-gray-300 rounded text-sm shadow-sm hover:bg-gray-50 ease-in-out transition-all w-fit mb-4'
         >
            {`Add all ${activeCategory.name} (${(activeCategory.traits.length * 0.001)
               .toString()
               .substring(0, 5)} ETH)`}
         </button>
         <div className='flex flex-row flex-wrap max-w-full gap-3'>
            {activeCategory.traits.map((part) => (
               <PartForPurchase key={part.name} part={part} category={tab} />
            ))}
         </div>
      </div>
   )
}
