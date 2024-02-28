'use client'

import { useState } from 'react'
import useGetAllTraits from '@/hooks/useGetAllTraits'
import { NPC } from '@/types/NPCType'
import TraitCard from './TraitCard'
import { refetchFn } from '@/types/RefetchType'

export default function AllParts({ npc, refetch }: { npc: NPC; refetch: refetchFn }) {
   type categoryType = 'Accessories' | 'Glasses' | 'Heads' | 'Bodies' | 'Backgrounds'
   const [tab, setTab] = useState<categoryType>('Bodies')
   const categories: categoryType[] = ['Accessories', 'Glasses', 'Heads', 'Bodies', 'Backgrounds']
   const singular = {
      'Accessories': 'accessory', 'Glasses': 'glasses', 'Heads': 'head', 'Bodies': 'body', 'Backgrounds': 'bg'
   }
   const { traits } = useGetAllTraits()

   return (
      <div className='flex flex-col w-full shrink mr-4 pb-4'>
         {
            /* FOR DEBUGGING <div>
               {npc.ownedTraits?.map((ot) => (
                  <div key={ot.id}>{`token: ${ot.tokenID}, qty owned:${ot.quantity}`}</div>
               ))}
            </div>
            <div className='flex flex-row'>
               {npc.equippedTraits?.map((et) => (
                  <div key={`boop-${et.toString()}`}>
                     {et.toString()}
                     {` | `}
                  </div>
               ))}
               </div> 
               */
            }



         <div className='flex flex-row gap-x-4 sm:gap-x-6 mb-4 w-full pp-sans text-3xl font-bold uppercase'>
            {categories.map((c) => (
               <div
                  key={c} // need a distinct id between tab
                  className={`${c == tab
                        ? ' text-neutral-900 underline'
                        : 'text-neutral-400 hover:text-neutral-900'
                     } hover:cursor-pointer`}
                  onClick={() => {
                     setTab(c)
                  }}
               >
                  {c}
               </div>
            ))}
         </div>
   
         <div className='flex flex-row flex-wrap'>
            {traits &&
               traits?.filter(t => t.type == singular[tab]).map((t) => (
                  <TraitCard refetch={refetch} trait={t} npc={npc} key={t.id} />
               ))}
         </div>

      </div>
   )
}
