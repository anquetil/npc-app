'use client'

import ImageData from '../utils/image-data.json'

import { svg2png } from '@/utils/svg2png'
import { useEffect, useState } from 'react'
import { buildSVG } from '@/utils/svgBuilder'
import { PNGCollectionEncoder } from '@/utils/sdk-fork/image'
export default function NPCRenderer({ id }: { id: number }) {
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
   console.log(svg)
   const [png, setPng] = useState<string | null>()

   useEffect(() => {
      const loadPng = async () => {
         setPng(await svg2png(svg, 512, 512))
      }
      loadPng()
   }, [svg])

   // useQuery to get NPC data
   return (
      <div>
         <div className='w-80 h-80'>
            <div className='relative'>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                  className='absolute top-0 left-0 '
                  alt={'boop'}
                  src={png ?? 'https://nouns.pics/404.svg'}
               />
            </div>
         </div>
         <div>{`NPC #${id}`}</div>
      </div>
   )
}
