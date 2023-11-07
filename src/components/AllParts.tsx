import Image from 'next/image';
import { categories } from '../utils/svg';
import PartForPurchase from './PartForPurchase';
import { useCartStore } from '@/stores/useCartStore';

export default function AllParts(){
   
   return(
      <div className='flex flex-col gap-y-8'>
         {
            categories.map((c, i) => 
               <div key={i}>
                  <div className=''>{c.name}</div>
                  <div className='flex flex-row flex-wrap max-w-full gap-3'>
                     {c.traits.map((part, j) => <PartForPurchase key={j} part={part}/>)}
                  </div>
               </div>
            )
         }
      </div>
   )
}