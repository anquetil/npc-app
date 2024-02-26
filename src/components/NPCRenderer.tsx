'use client'

import { NPC } from '@/types/NPCType'
import Image from 'next/image'

export default function NPCRenderer({ npc }: { npc: NPC }) {
   // useQuery to get NPC data
   return (
      <div className='w-fit bg-gray-100'>
         <Image
            width={200}
            height={200}
            className=''
            alt={'boop'}
            src={`data:image/svg+xml;base64,${npc.fullSVG}`}
         />
         <div>{`NPC #${npc.tokenID}`}</div>
      </div>
   )
}
