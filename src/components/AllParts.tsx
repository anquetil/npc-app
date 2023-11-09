'use client'

import { PartType } from '@/types/PartType'
import PartForPurchase from './PartForPurchase'
import { useState } from 'react'

export default function AllParts({
   categories,
}: {
   categories: {
      name: string
      traits: PartType[]
   }[]
}) {
   const [tab, setTab] = useState<string>('Bodies')
   const activeCategory = categories.filter((c) => c.name == tab)[0]

   return (
      <div className='flex flex-col'>
         <div className='flex flex-row gap-x-8 mb-4 border-b-2 border-gray-100'>
            {categories.map((c, i) => (
               <div
                  key={i}
                  className={`${
                     c.name == tab ? 'border-b-[3px] -mb-[2px] border-blue-500 text-neutral-700' : 'text-neutral-500'
                  } pb-1 hover:cursor-pointer hover:text-neutral-700`}
                  onClick={()=>{setTab(c.name)}}
               >
                  {c.name}
               </div>
            ))}
         </div>
         <div className='flex flex-row flex-wrap max-w-full gap-3'>
            {activeCategory.traits.map((part, j) => (
               <PartForPurchase key={j} part={part} category={tab} />
            ))}
         </div>
      </div>
   )
}
