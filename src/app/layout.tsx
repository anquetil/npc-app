import type { Metadata } from 'next'
import { Hanken_Grotesk, Inter, Londrina_Solid } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import localFont from 'next/font/local'
import React from 'react'
import ImageData from '../utils/image-data-no-images.json'
import Image from 'next/image'
import { buildSVG } from '@/utils/svgBuilder'
import Link from 'next/link'
import { CustomConnectButton } from '@/components/CustomConnectButton'

const hk = Hanken_Grotesk({ subsets: ['latin'] })
// const inter = Inter({ subsets: ['latin'] })

export const ls = Londrina_Solid({
   subsets: ['latin'],
   variable: '--font-londrina',
   weight: ['300', '400'],
})

// Font files can be colocated inside of `app`
export const pp_mono = localFont({
   src: [
      {
         path: './fonts/PPMondwest-Regular.otf',
         weight: '400',
         style: 'normal',
      },
      {
         path: './fonts/PPMondwest-Bold.otf',
         weight: '700',
         style: 'normal',
      },
   ],
   variable: '--pp-mono',
})

export const pp_sans = localFont({
   src: [
      {
         path: './fonts/PPNeueBit-Regular.otf',
         weight: '400',
         style: 'normal',
      },
      {
         path: './fonts/PPNeueBit-Bold.otf',
         weight: '700',
         style: 'normal',
      },
   ],
   variable: '--pp-sans',
})

export const metadata: Metadata = {
   title: 'Noun PCs',
   description: 'Craft a Noun Playable Citizen and collect traits!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   const logo = `data:image/svg+xml;base64,${btoa(
      buildSVG(
         [
            {
               data: '0x00051a15040400120104001201020004010167025b01670a5b0801025b01670b5b08010167025b01670a5b08010e5b08010e5b08010e5b08010e5b020102b104010e5b08010e5b020102b104010e5b08010e5b020102b104010e5b0f01012401010124060102000a0101240101012401010124050104001201',
            },
         ],
         ImageData.palette /*, "ccaa55" OPTIONAL BG */
      )
   )}`
   return (
      <html lang='en'>
         <body
            className={`${hk.className} ${ls.variable} ${pp_sans.variable} ${pp_mono.variable} min-h-screen`}
         >
            <Providers>
               <div className='w-screen flex flex-row justify-between items-center px-2'>
                  <Link href="/" className='flex flex-row items-center active:scale-110 ease-in-out transition-all'>
                     <Image src={logo} alt='logo' width={50} height={50} />
                     <div className='pp-sans font-bold text-3xl'>NPC</div>
                  </Link>
                  <div className='flex flex-row gap-x-2 items-center'>
                     <Link href="/gallery">Gallery (All NPCs) </Link>
                     <CustomConnectButton/>
                  </div> 

               </div>
               {/*<div className='flex flex-row w-full bg-amber-100 border border-amber-200 justify-between px-12 py-3 items-center'>
                  <div className='text-red-900 text-xl pp-sans'>
                     Noun Playable Citizens
                  </div>
                  <div className='flex flex-row gap-x-2 items-center'>
                     <CustomConnectButton />
                  </div>
   </div>*/}
               {children}
            </Providers>
         </body>
      </html>
   )
}
