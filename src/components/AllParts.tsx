'use client'

import { PartType } from '@/types/PartType'
import PartForPurchase from './PartForPurchase'
import { useState } from 'react'
import { useCartStore } from '@/stores/useCartStore'

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
   const addToCart = useCartStore((state) => state.add)
   const { items } = useCartStore()

   const addAllCategory = () => {
      activeCategory.traits.map(
         (t) => {
            const item = items.get(t.name);
            console.log(item)
            if(item == undefined || item == 0)addToCart(t.name)
         }
      )
   }

   return (
      <div className='flex flex-col'>
         <div className='flex flex-row gap-x-4 sm:gap-x-8 mb-4 border-b-2 border-gray-100 text-sm sm:text-base'>
            {categories.map((c, i) => (
               <div
                  key={c.name} // need a distinct id between tab
                  className={`${
                     c.name == tab
                        ? 'border-b-[3px] -mb-[2px] border-blue-500 text-neutral-700'
                        : 'text-neutral-500'
                  } pb-1 hover:cursor-pointer hover:text-neutral-700`}
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
