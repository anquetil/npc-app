'use client'

import { erc721railsABI } from '@/abis/erc721rails-abis'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { parseAbi, parseAbiItem, parseEther } from 'viem'
import {
   useAccount,
   useContractWrite,
   usePrepareContractWrite,
   usePrepareSendTransaction,
   useSendTransaction,
   useWaitForTransaction,
} from 'wagmi'

const placeholderText = ['Minting your NPC.', 'Minting your NPC..', 'Minting your NPC...']

export default function MintNPCButton() {
   const chainID = process.env.NEXT_PUBLIC_TESTNET == 'TRUE' ? 5 : 8453
   const { address, isConnected } = useAccount() // assume user is connected if button is shown
   const [loadingText, setLoadingText] = useState(0)
   const router = useRouter()
   const { openConnectModal } = useConnectModal()

   const { config: mintConfig } = usePrepareContractWrite({
      chainId: chainID,
      address: '0x4dD30A31962431da2e7359de2527eeD09902B65F',
      abi: erc721railsABI,
      functionName: 'mintTo',
      args: [address!, 1n],
   })

   const {
      write,
      data,
      isSuccess: sentTransaction,
      isError,
      error,
   } = useContractWrite(mintConfig)

   const { isSuccess: mintSuccess } = useWaitForTransaction({
      hash: data?.hash,
      onSuccess: (data) => {
         const tokenId = parseInt(data.logs[0].topics[3] as string, 16)
         router.push(`/npc/${tokenId}`)
      },
   })

   if (mintSuccess && data) {
      return <div>Minted! {data.hash}</div>
   } else if (sentTransaction) {
      return <div>{placeholderText[loadingText]}</div>
   } else {
      return (
         <div>
            <button
               className='w-fit pp-sans py-2 px-4 bg-white hover:bg-gray-100 text-blue-800  border border-blue-500 rounded 
               text-2xl font-bold leading-[.75] shadow-[0.75px_2px_0_0_#AAA]  ease-in-out transition-all active:shadow-none active:translate-x-[0.75px] active:translate-y-[2px]'
               onClick={() => {
                  isConnected ? write?.() : openConnectModal?.()
               }}
            >
               Mint a Noun PC
            </button>
            {/*isError && (
               <div className='text-xs text-red-500 font-mono overflow-clip'>
                  {error?.message.substring(0, 50)}
               </div>
            )*/}
         </div>
      )
   }
}
