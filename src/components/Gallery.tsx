'use client'

import useGetAllNPCs from '@/hooks/useGetAllNPCs'
import Link from 'next/link'
import BasicENSLabel from './BasicENSLabel'
import NPCRenderer from './NPCRenderer'

export default function Gallery() {
   const { npcs } = useGetAllNPCs()
   if (npcs) {
      const orderedNPCs = [...npcs].sort((a, b) => Number(b.id) - Number(a.id))
      return (
         <div className='px-6 flex flex-wrap gap-4'>
            {orderedNPCs.map((n) => (
               <Link
                  className='bg-gray-50 flex flex-col w-28'
                  href={`/npc/${n.tokenID}`}
                  key={n.id}
               >
                  <NPCRenderer npc={n} />
                  <div className='text-gray-700 text-sm'>
                     <BasicENSLabel address={n.owner} />
                  </div>
               </Link>
            ))}
         </div>
      )
   } else {
      ;<div>Error fetching NPCs</div>
   }
}
