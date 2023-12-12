import type { Metadata } from 'next'
import { Hanken_Grotesk, Inter, Londrina_Solid } from 'next/font/google'
import './globals.css'
import { CustomConnectButton } from '@/components/CustomConnectButton'
import { Providers } from './providers'
import localFont from 'next/font/local'
import Cart from '@/components/Cart'

const hk = Hanken_Grotesk({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const ls = Londrina_Solid({
   subsets: ['latin'],
   variable: '--font-londrina',
   weight: ['300', '400'],
})

// Font files can be colocated inside of `app`
export const pp_mono = localFont({
   src: [
      {
         path: '../../public/fonts/PPMondwest/PPMondwest-Regular.woff2',
         weight: '400',
         style: 'normal',
      },
      {
         path: '../../public/fonts/PPMondwest/PPMondwest-Bold.woff2',
         weight: '700',
         style: 'normal',
      },
   ],
   variable: '--pp-mono',
})

export const pp_sans = localFont({
   src: [
      {
         path: '../../public/fonts/PPNeueBit/PPNeueBit-Regular.woff2',
         weight: '400',
         style: 'normal',
      },
      {
         path: '../../public/fonts/PPNeueBit/PPNeueBit-Bold.woff2',
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
   return (
      <html lang='en'>
         <body
            className={`${hk.className} ${ls.variable} ${pp_sans.variable} ${pp_mono.variable} min-h-screen`}
         >
            <Providers>
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
