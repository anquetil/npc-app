import { categories } from '@/utils/svg'
import Image from 'next/image'
export default function NPCRenderer() {
   const reverse = categories.slice(0).reverse()
   const svgs = reverse.map((c) => c.traits[0].svg)

   return (
      <div className='w-20 h-20'>
         <div className='relative'>
            {svgs.map((svg, i) => (
               <Image
                  className='absolute top-0 left-0 '
                  style={{ zIndex: i }}
                  key={i}
                  width={80}
                  height={80}
                  alt={'boop'}
                  src={svg}
               />
            ))}
         </div>
      </div>
   )
}
