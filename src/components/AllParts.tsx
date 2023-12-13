'use client'

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
      <div className='flex flex-col w-full shrink mr-4'>
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
