'use client'

import Image from 'next/image';
import { categories } from '../utils/svg';
import { useCartStore } from '@/stores/useCartStore';
import { PartType } from '@/types/PartType';

export default function PartForPurchase({
   part,
}: {
   part: PartType
}){
   const addToCart = useCartStore((state) => state.add)
   const removeFromCart = useCartStore((state) => state.remove)
   const {name , svg, filename} = part
   const { items } = useCartStore()
   const count = items.get(name) ?? 0;
   return(
      <div onClick={() => {console.log('here'); addToCart(name)}} className='flex flex-col gap-y-1 w-24'>
         <Image className='border bg-blue-200' width={96} height={96} alt={name} src={svg} />
         <div className='text-xs wrap h-8'>{name}</div>
         <div>{`Count: ${count}`}</div>
      </div>
   )
}