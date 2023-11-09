import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CustomConnectButton } from '@/components/CustomConnectButton'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Noun PCs',
   description: 'Craft a Noun Playable Citizen and collect traits!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang='en'>
         <body className={`${inter.className} min-h-screen`}>
            <Providers>
               <div className='flex flex-row w-full bg-gray-50 border border-gray-200 justify-between px-12 py-2 items-center'>
                  <div>Noun Playable Citizens</div>
                  <CustomConnectButton />
               </div>
               {children}
            </Providers>
         </body>
      </html>
   )
}
