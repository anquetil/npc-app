'use client'

import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
export const CustomConnectButton = () => {
   return (
      <ConnectButton.Custom>
         {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
         }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading'
            const connected =
               ready &&
               account &&
               chain &&
               (!authenticationStatus || authenticationStatus === 'authenticated')
            return (
               <div
                  {...(!ready && {
                     'aria-hidden': true,
                     style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                     },
                  })}
               >
                  {(() => {
                     if (!connected) {
                        return (
                           <button
                              className={`w-36 text-sm text-gray-800 rounded border p-2 shadow-sm hover:shadow bg-white hover:bg-gray-50
                              ease-in-out transition-all active:mt-[2px] active:mb-[-2px]`}
                              onClick={openConnectModal}
                              type='button'
                           >
                              Connect Wallet
                           </button>
                        )
                     }
                     if (chain.unsupported) {
                        return (
                           <button
                              className={`w-36 text-sm text-white rounded border p-2 shadow-md bg-blue-600 hover:bg-blue-500 
                              ease-in-out transition-all active:mt-[2px] active:mb-[-2px]`}
                              onClick={openChainModal}
                              type='button'
                           >
                              Switch to{' '}
                              {process.env.NEXT_PUBLIC_TESTNET == 'TRUE'
                                 ? 'Goerli'
                                 : 'Base'}
                           </button>
                        )
                     }
                     return (
                        <div className='flex flex-row gap-x-4 items-center'>
                           <button
                              className='bg-white border-gray-300 text-gray-700 flex flex-row items-center gap-x-2 px-3 py-1 rounded-md border text-sm hover:shadow-sm ease-in-out transition-all'
                              onClick={openAccountModal}
                              type='button'
                           >
                              <Image
                                 width={20}
                                 height={20}
                                 alt={'avatar'}
                                 className='rounded-full'
                                 src={account?.ensAvatar ?? 'https://noun.pics/0.png'}
                              />
                              {account.displayName}
                           </button>
                        </div>
                     )
                  })()}
               </div>
            )
         }}
      </ConnectButton.Custom>
   )
}
