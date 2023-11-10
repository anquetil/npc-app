'use client'

import Image from 'next/image'
import { useCartStore } from '@/stores/useCartStore'
import { PartType } from '@/types/PartType'
import { useState } from 'react'

export default function PartForPurchase({
   part,
   category,
}: {
   part: PartType
   category: string
}) {
   const { name, svg } = part
   const cartItems = useCartStore((state) => state.items)
   const cartItem = cartItems.get(name)

   const addToCart = useCartStore((state) => state.add)
   const removeFromCart = useCartStore((state) => state.remove)
   const inCart = cartItem != undefined && cartItem > 0
   const listenToAdAll = useCartStore.subscribe((newState) => {
      setSelected(newState.items.get(name) == 1)
   })
   const [selected, setSelected] = useState<boolean>(inCart)

   const trimming = new Map([
      ['Bodies', '-mt-[30%]'],
      ['Heads', '-mb-3'],
      ['Accessories', '-mt-[40%]'],
      ['Glasses', '-mb-[30%] -mt-2'],
      ['Backgrounds', ''],
   ])
   return (
      <div
         className={`flex flex-col w-40 items-center gap-y-1 ${
            selected
               ? 'bg-green-100 hover:bg-green-50 border-green-300'
               : 'bg-blue-100 hover:bg-blue-50 border-blue-300'
         }  ease-in-out transition-all rounded border shadow-sm relative group `}
      >
         <button
            onClick={() => {
               if (selected && inCart) {
                  setSelected(false)
                  removeFromCart(name)
               } else if (!selected && !inCart) {
                  setSelected(true)
                  addToCart(name)
               }
            }}
            className={`z-20  absolute ${
               selected
                  ? 'bg-green-500 hover:bg-green-400'
                  : 'bg-gray-700 hover:bg-gray-500'
            } top-1 right-1 rounded-full ease-in-out transition-all text-white p-[2px]`}
         >
            {!selected ? (
               <svg
                  width='15'
                  height='15'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path
                     d='M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z'
                     fill='currentColor'
                     fillRule='evenodd'
                     clipRule='evenodd'
                  ></path>
               </svg>
            ) : (
               <svg
                  width='15'
                  height='15'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path
                     d='M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z'
                     fill='currentColor'
                     fillRule='evenodd'
                     clipRule='evenodd'
                  ></path>
               </svg>
            )}
         </button>
         <div className='min-w-full self-center flex flex-col'>
            <Image
               className={`${trimming.get(
                  category
               )}  pointer-events-none overflow-auto z-0 self-center ${
                  category == 'Backgrounds' && 'rounded'
               }`}
               width={160}
               height={160}
               alt={name}
               src={svg}
            />
         </div>

         <div className='text-xs font-mono text-center'>
            <div className='wrap mt-1 text-gray-700 max-w-full'>{name}</div>
            <div className='text-gray-500 max-w-full'>{`${(Math.random() * 1000).toFixed(
               0
            )} left`}</div>
         </div>
      </div>
   )
}
