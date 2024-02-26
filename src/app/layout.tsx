import type { Metadata } from 'next'
import { Hanken_Grotesk, Inter, Londrina_Solid } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import localFont from 'next/font/local'
import React from 'react'
import Image from 'next/image'
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
   const logo = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiAvPjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTAiIHg9IjgwIiB5PSI1MCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEwIiB4PSI4MCIgeT0iNjAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjEwIiB4PSI2MCIgeT0iNzAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxMDAiIHk9IjcwIiBmaWxsPSIjZmRmOGZmIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMTEwIiB5PSI3MCIgZmlsbD0iIzE5MjlmNCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjEzMCIgeT0iNzAiIGZpbGw9IiNmZGY4ZmYiIC8+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgeD0iMTQwIiB5PSI3MCIgZmlsbD0iIzE5MjlmNCIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjI0MCIgeT0iNzAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjEwIiB4PSI0MCIgeT0iODAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxMDAiIHk9IjgwIiBmaWxsPSIjMTkyOWY0IiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTIwIiB5PSI4MCIgZmlsbD0iI2ZkZjhmZiIgLz48cmVjdCB3aWR0aD0iMTEwIiBoZWlnaHQ9IjEwIiB4PSIxMzAiIHk9IjgwIiBmaWxsPSIjMTkyOWY0IiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMjQwIiB5PSI4MCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjQwIiB5PSI5MCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjEwMCIgeT0iOTAiIGZpbGw9IiNmZGY4ZmYiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIxMTAiIHk9IjkwIiBmaWxsPSIjMTkyOWY0IiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTMwIiB5PSI5MCIgZmlsbD0iI2ZkZjhmZiIgLz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwIiB4PSIxNDAiIHk9IjkwIiBmaWxsPSIjMTkyOWY0IiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMjQwIiB5PSI5MCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjQwIiB5PSIxMDAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSIxMDAiIGZpbGw9IiMxOTI5ZjQiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyNDAiIHk9IjEwMCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjQwIiB5PSIxMTAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSIxMTAiIGZpbGw9IiMxOTI5ZjQiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyNDAiIHk9IjExMCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjQwIiB5PSIxMjAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSIxMjAiIGZpbGw9IiMxOTI5ZjQiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyNDAiIHk9IjEyMCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHg9IjQwIiB5PSIxMzAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSIxMzAiIGZpbGw9IiMxOTI5ZjQiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyNDAiIHk9IjEzMCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjQwIiB5PSIxNDAiIGZpbGw9IiM5ZDhlNmUiIC8+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjEwIiB4PSI2MCIgeT0iMTQwIiBmaWxsPSIjYzViOWExIiAvPjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMTAiIHg9IjEwMCIgeT0iMTQwIiBmaWxsPSIjMTkyOWY0IiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMjQwIiB5PSIxNDAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjEwIiB4PSI0MCIgeT0iMTUwIiBmaWxsPSIjYzViOWExIiAvPjxyZWN0IHdpZHRoPSIxNDAiIGhlaWdodD0iMTAiIHg9IjEwMCIgeT0iMTUwIiBmaWxsPSIjMTkyOWY0IiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iMjQwIiB5PSIxNTAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSI0MCIgeT0iMTYwIiBmaWxsPSIjOWQ4ZTZlIiAvPjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSIxMCIgeD0iNjAiIHk9IjE2MCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjEwIiB4PSIxMDAiIHk9IjE2MCIgZmlsbD0iIzE5MjlmNCIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjI0MCIgeT0iMTYwIiBmaWxsPSIjYzViOWExIiAvPjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSIxMCIgeD0iNDAiIHk9IjE3MCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjEwIiB4PSIxMDAiIHk9IjE3MCIgZmlsbD0iIzE5MjlmNCIgLz48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHg9IjI0MCIgeT0iMTcwIiBmaWxsPSIjYzViOWExIiAvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCIgeD0iNDAiIHk9IjE4MCIgZmlsbD0iIzlkOGU2ZSIgLz48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMTAiIHg9IjYwIiB5PSIxODAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMCIgeD0iMTAwIiB5PSIxODAiIGZpbGw9IiMxOTI5ZjQiIC8+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiB4PSIyNDAiIHk9IjE4MCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEwIiB4PSI0MCIgeT0iMTkwIiBmaWxsPSIjYzViOWExIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTcwIiB5PSIxOTAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxODAiIHk9IjE5MCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE5MCIgeT0iMTkwIiBmaWxsPSIjMDAwMDAwIiAvPjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSIxMCIgeD0iMjAwIiB5PSIxOTAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMCIgeD0iNjAiIHk9IjIwMCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE2MCIgeT0iMjAwIiBmaWxsPSIjMDAwMDAwIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMTcwIiB5PSIyMDAiIGZpbGw9IiNjNWI5YTEiIC8+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiB4PSIxODAiIHk9IjIwMCIgZmlsbD0iIzAwMDAwMCIgLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHg9IjE5MCIgeT0iMjAwIiBmaWxsPSIjYzViOWExIiAvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgeD0iMjAwIiB5PSIyMDAiIGZpbGw9IiMwMDAwMDAiIC8+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjEwIiB4PSIyMTAiIHk9IjIwMCIgZmlsbD0iI2M1YjlhMSIgLz48cmVjdCB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEwIiB4PSI4MCIgeT0iMjEwIiBmaWxsPSIjYzViOWExIiAvPjwvc3ZnPg==`
   return (
      <html lang='en'>
         <body
            className={`${hk.className} ${ls.variable} ${pp_sans.variable} ${pp_mono.variable} min-h-screen`}
         >
            <Providers>
               <div className='w-screen flex flex-row justify-between items-center px-2'>
                  <Link
                     href='/'
                     className='flex flex-row items-center active:scale-110 ease-in-out transition-all'
                  >
                     <Image src={logo} alt='logo' width={50} height={50} />
                     <div className='pp-sans font-bold text-3xl'>NPC</div>
                  </Link>
                  <div className='flex flex-row gap-x-2 items-center'>
                     <Link href='/gallery'>Gallery (All NPCs) </Link>
                     <CustomConnectButton />
                  </div>
               </div>
               {/*<div className='flex flex-row w-full bg-amber-100 border border-amber-200 justify-between px-12 py-3 items-center'>
                  <div className='text-red-900 text-xl pp-sans'>
                     Noun Playable Characters
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
