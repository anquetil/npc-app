'use client'

import AllParts from './AllParts'
import { useState } from 'react'
import NPCRenderer from './NPCRenderer'

export function PrimaryTabs() {
   const [storeTabActive, setStoreTabActive] = useState(true)

   return (
      <div className='flex flex-col items-center w-full'>
         <div className='w-[400px] h-fit mb-8 items-center justify-center gap-x-1 rounded-lg bg-gray-100 p-1 grid grid-cols-2 font-medium'>
            <button
               onClick={() => {
                  setStoreTabActive(true)
               }}
               className={`${
                  storeTabActive
                     ? 'bg-white shadow-sm text-black'
                     : 'hover:bg-gray-200 text-gray-500 hover:cursor-pointer'
               }
               inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5 ring-offset-background 
               ease-in-out transition-all`}
            >
               Store
            </button>
            <button
               onClick={() => {
                  setStoreTabActive(false)
               }}
               className={`${
                  !storeTabActive
                     ? 'bg-white shadow-sm text-black'
                     : 'hover:bg-gray-200 text-gray-500 hover:cursor-pointer'
               } inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5  ring-offset-background ease-in-out  transition-all`}
            >
               My NPC
            </button>
         </div>
         {storeTabActive ? <AllParts /> : <NPCRenderer id={1} />}
      </div>
   )
}
