'use client'

import { useCartStore } from '@/stores/useCartStore';
import { getNonZeroItems } from '@/utils/storeUtil';

export default function Cart(){
   const {items} = useCartStore()
   const nonZeroItems = getNonZeroItems(items);
   return(
      <div className='flex flex-col gap-y-1'>
         {
            nonZeroItems.map((c, i) => 
               <div key={i}>
                  {`${c.filename}: ${c.count}`}
               </div>
            )
         }
      </div>
   )
}