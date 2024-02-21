'use client'

import ImageData from '../utils/image-data.json'
import { svg2png } from '@/utils/svg2png'
import { useEffect, useState } from 'react'
import { buildSVG } from '@/utils/svgBuilder'
import { PNGCollectionEncoder } from '@/utils/sdk-fork/image'
import { NPC } from '@/types/NPCType'
import Image from 'next/image'
import { rleBytesToNoun } from '@/utils/svg'
import useGetAllTraits from '@/hooks/useGetAllTraits'

export default function NPCRenderer({ npc }: { npc: NPC }) {
   const { traits } = useGetAllTraits()
   const seed = { background: 0, body: 0, head: 10, glasses: 0, accessory: 0 }
   const { bodies, accessories, heads, glasses } = ImageData.images
   const encoder = new PNGCollectionEncoder(ImageData.palette)
   const svg = buildSVG(
      [
         bodies[seed.body],
         accessories[seed.accessory],
         heads[seed.head],
         glasses[seed.glasses],
      ],
      encoder.data.palette,
      ImageData.bgcolors[0]
   )
   const [png, setPng] = useState<string | null>()
   const equippedTraitsBytes = traits  ? npc.equippedTraits.map((et) => traits[Number(et) - 1]) : []
   useEffect(() => {
      const loadPng = async () => {
         setPng(await svg2png(svg, 512, 512))
      }
      loadPng()
   }, [svg])

   // useQuery to get NPC data
   return (
      <div>
         <div className='bg-gray-100'>
            {/* eslint-disable-next-line @next/next/no-img-element, react/jsx-no-undef */}
            <Image
               width={200}
               height={200}
               className=''
               alt={'boop'}
               src={traits ? rleBytesToNoun(equippedTraitsBytes) : ''}
            />
         </div>
         <div>{`NPC #${npc.tokenID}`}</div>
      </div>
   )
}
