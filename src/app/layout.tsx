import type { Metadata } from 'next'
import { Inter, Londrina_Solid } from 'next/font/google'
import './globals.css'
import { CustomConnectButton } from '@/components/CustomConnectButton'
import { Providers } from './providers'
import Link from 'next/link'
import Cart from '@/components/Cart'

const inter = Inter({ subsets: ['latin'] })
export const ls = Londrina_Solid({
   subsets: ['latin'],
   variable: '--font-londrina',
   weight: ['300', '400'],
})

export const metadata: Metadata = {
   title: 'Noun PCs',
   description: 'Craft a Noun Playable Citizen and collect traits!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body className={`${inter.className} ${ls.variable} min-h-screen`}>
            <Providers>
               <div className='flex flex-row w-full bg-gray-50 border border-gray-200 justify-between px-12 py-3 items-center'>
                  <div className='text-gray-700 text-xl font-londrina'>
                     Noun Playable Citizens
                  </div>
                  <div className='flex flex-row gap-x-2 items-center'>
                     <CustomConnectButton />
                  </div>
               </div>
               {children}
               <Cart />
            </Providers>
         </body>
      </html>
   )
}
