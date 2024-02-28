'use client'

import { erc721railsABI } from '@/abis/erc721rails-abis'
import { freeMintControllerABI } from '@/abis/freeMintControllerABI'
import { TransactionStatus } from '@/types/TransactionStatusType'
import { deploys } from '@/utils/addresses'
import { currentChainID } from '@/utils/chainFuncs'
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import {
   useAccount,
   useChainId,
   useTransactionReceipt,
   useWaitForTransactionReceipt,
   useWriteContract,
} from 'wagmi'

const placeholderText = ['Minting your NPC.', 'Minting your NPC..', 'Minting your NPC...']

export default function MintNPCButton() {
   const targetChainID = currentChainID()
   const { isConnected } = useAccount() // assume user is connected if button is shown
   const connectedChainID = useChainId()
   const [loadingText, setLoadingText] = useState(0)
   const router = useRouter()
   const { openConnectModal } = useConnectModal()
   const { openChainModal } = useChainModal()

   const { writeContract, status, data } = useWriteContract()
   const { data: result } = useWaitForTransactionReceipt({
      hash: data,
   })

   const txnState: TransactionStatus =
      status == 'idle'
         ? 'IDLE'
         : status == 'pending'
         ? 'PREPARED'
         : result
         ? 'CONFIRMED'
         : 'SENT'

   console.log('state: ', txnState)
   if (txnState == 'CONFIRMED') {
      const tokenId = parseInt(result!.logs[1].topics[3] as string, 16)
      // Is there a way to get this data more reliably?
      router.push(`/npc/${tokenId}`)
   }

   if (txnState == 'CONFIRMED' && data) {
      return <div>Minted! {data}</div>
   } else if (txnState == 'SENT') {
      return <div>{placeholderText[loadingText]}</div>
   } else {
      return (
         <div>
            <button
               className='w-fit pp-sans py-2 px-4 bg-white hover:bg-gray-100 text-blue-800  border border-blue-700 rounded 
               text-2xl font-bold leading-[.75] shadow-[0.75px_2px_0_0_#AAA]  ease-in-out transition-all active:shadow-none active:translate-x-[0.75px] active:translate-y-[2px]'
               onClick={() => {
                  isConnected
                     ? connectedChainID == targetChainID
                        ? writeContract({
                             chainId: targetChainID,
                             address: deploys.freeMintController as Address,
                             abi: freeMintControllerABI,
                             functionName: 'mint721',
                             // need to pay 0.001 ETH as fee.
                             // Todo: replace with parseETH so it's easier to read
                             // I don't love reading wei values
                             value: 1000000000000000n,
                             args: [deploys['NPC(721)']],
                          })
                        : openChainModal?.()
                     : openConnectModal?.() //if not connected, prompt connect, if wrong chain prompt right chain
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
