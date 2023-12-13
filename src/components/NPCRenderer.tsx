import { categories } from '@/utils/svg'
import { PNGCollectionEncoder, buildSVG } from '@nouns/sdk'
import { ImageData, getNounData, getRandomNounSeed } from '@nouns/assets'

import Image from 'next/image'
import { svg2png } from '@/utils/svg2png'
import { useEffect, useState } from 'react'
export default function NPCRenderer({ id }: { id: number }) {
   const seed = { background: 0, body: 0, head: 10, glasses: 0, accessory: 0 }
   const { parts, background } = getNounData(seed)
   const encoder = new PNGCollectionEncoder(ImageData.palette)
   const svg = buildSVG(parts, encoder.data.palette, background)
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
