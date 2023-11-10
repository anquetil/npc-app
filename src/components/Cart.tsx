'use client'

import { useCartStore } from '@/stores/useCartStore'
import { getNonZeroItems } from '@/utils/storeUtil'
import { useState } from 'react'

export default function Cart() {
   const [hidden, setHidden] = useState(true)
   const [ping, setPing] = useState(false)
   useCartStore.subscribe(() => {
      setPing(true)
      setTimeout(() => setPing(false), 500)
   })
   const clearCart = useCartStore((state) => state.clear)
   const { items } = useCartStore()
   const nonZeroItems = getNonZeroItems(items).filter((i) => i.count > 0)

   return (
      <div
         className='bg-white z-50 shadow
      border border-gray-300 p-2 sm:p-4 fixed box-border bottom-2  w-[60%] sm:w-[90%] self-center font-mono rounded'
      >
         <div className='flex flex-row w-full justify-between'>
            <div
               className='text-green-800 font-semibold flex flex-row gap-x-2 items-center hover:cursor-pointer'
               onClick={() => {
                  setHidden(!hidden)
               }}
            >
               <div className='text-sm sm:text-base'>Cart</div>
               <div
                  className={`${
                     ping ? ' scale-150 -translate-y-2' : ''
                  } transition ease-out delay-150 duration-200`}
               >{`(${nonZeroItems.length})`}</div>
               <div className={`${!hidden && 'rotate-180'}`}>
                  <svg
                     width='15'
                     height='15'
                     viewBox='0 0 15 15'
                     fill='none'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        d='M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z'
                        fill='currentColor'
                        fillRule='evenodd'
                        clipRule='evenodd'
                     ></path>
                  </svg>
               </div>
            </div>
            
            <div className='gap-x-6 flex flex-row'>
               <button onClick={clearCart} className='text-red-500 px-4 py-1 rounded text-sm hover:bg-red-100 ease-in-out transition-all active:bg-red-200'>
                  Clear
               </button>
               <button className='bg-blue-600 hover:bg-blue-500 active:bg-blue-400 text-white font-londrina rounded-md px-4 py-2 shadow'>
                  Mint
               </button>
            </div>
         </div>

         <div
            x-transition='abc'
            className={`flex-grid grid-cols-2 sm:grid-cols-4s max-h-24  flex-col overflow-scroll text-gray-500 text-xs ${
               hidden ? 'h-0' : 'h-fit'
            } `}
         >
            {nonZeroItems.map((c, i) => (
               <div key={c.filename}>{`${c.filename}: ${c.count}`}</div>
            ))}
         </div>
      </div>
   )
}
