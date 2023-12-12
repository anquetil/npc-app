'use client'

import { PartType } from '@/types/PartType'
import PartForPurchase from './PartForPurchase'
import { useState } from 'react'
import { useCartStore } from '@/stores/useCartStore'
import { categories } from '@/utils/svg'

export default function AllParts() {
   const [tab, setTab] = useState<string>('Bodies')
   const activeCategory = categories.filter((c) => c.name == tab)[0]
   const addToCart = useCartStore((state) => state.add)
   const { items } = useCartStore()

   const addAllCategory = () => {
      activeCategory.traits.map((t) => {
         const item = items.get(t.name)
         console.log(item)
         if (item == undefined || item == 0) addToCart(t.name)
      })
   }

   return (
      <div className='flex flex-col w-full  p-4 sm:p-12'>
         <div className='flex flex-row gap-x-4 sm:gap-x-6 mb-4  text-sm sm:text-base w-full px-2'>
            {categories.map((c, i) => (
               <div
                  key={c.name} // need a distinct id between tab
                  className={`${
                     c.name == tab
                        ? ' text-neutral-900 bg-white border-opacity-100 '
                        : 'text-neutral-800 hover:text-neutral-900 hover:bg-white hover:bg-opacity-90'
                  } hover:cursor-pointer  rounded-2xl py-1 border border-opacity-0 border-amber-200 px-3`}
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
