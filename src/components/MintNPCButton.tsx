'use client'

import { testSendETHAddressGoerli } from '@/utils/addresses'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { parseEther } from 'viem'
import {
   usePrepareSendTransaction,
   useSendTransaction,
   useWaitForTransaction,
} from 'wagmi'

const placeholderText = ['Minting your NPC.', 'Minting your NPC..', 'Minting your NPC...']

export default function MintNPCButton() {
   const [loadingText, setLoadingText] = useState(0)
   const router = useRouter()

   const {
      config,
      error: configError,
      isError: isConfigError,
   } = usePrepareSendTransaction({
      to: testSendETHAddressGoerli,
      value: parseEther('0.0001'),
   })

   const {
      sendTransaction,
      data,
      isSuccess: sentTransaction,
      isError,
      error,
   } = useSendTransaction(config)

   const { isSuccess } = useWaitForTransaction({
      hash: data?.hash,
      onSuccess: (data) => {
         const tokenId = 10 //parseInt(data.logs[0].topics[3] as string, 16);
         router.push(`/character/${tokenId}`)
      },
   })
   useEffect(() => {
      const timer = setInterval(() => {
         setLoadingText((prevIndex) => {
            if (prevIndex === placeholderText.length - 1) {
               return 0
            }
            return prevIndex + 1
         })
      }, 400)
      return () => clearInterval(timer) //cleanup function in order clear the interval timer when the component unmounts
   }, [])

   if (isSuccess && data) {
      return <div>Minted! {data.hash}</div>
   } else if (sentTransaction) {
      return <div>{placeholderText[loadingText]}</div>
   } else if (isError) {
      return (
         <div>
            <button
               className='w-fit p-1 px-2 border border-gray-300 rounded text-sm shadow-sm hover:bg-gray-50 ease-in-out transition-all'
               onClick={() => {
                  sendTransaction?.()
               }}
            >
               Mint a Noun PC
            </button>
            <div className='text-xs text-red-500 font-mono overflow-clip'>
               {error?.message.substring(0, 50)}
            </div>
         </div>
      )
   } else {
      return (
         <button
            className='w-fit p-1 px-2 border border-gray-300 rounded text-sm shadow-sm hover:bg-gray-50 ease-in-out transition-all'
            onClick={() => {
               sendTransaction?.()
            }}
         >
            Mint a Noun PC
         </button>
      )
   }
}
