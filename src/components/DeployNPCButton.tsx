'use client'

import { ERC6551RegistryABI } from '@/abis/erc6551RegistryABI'
import { deploys } from '@/utils/addresses'
import { Address } from 'viem'
import { CustomConnectButton } from './CustomConnectButton'
import { currentChainID } from '@/utils/chainFuncs'
import { refetchFn } from '@/types/RefetchType'
import { useEffect } from 'react'
import { TransactionStatus } from '@/types/TransactionStatusType'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

export default function DeployNPCButton({
   tokenID,
   refetch,
}: {
   tokenID: number
   refetch: refetchFn
}) {
   const { writeContract, status, data: transactionHash } = useWriteContract()
   const { data: result } = useWaitForTransactionReceipt({
      hash: transactionHash,
   })

   const txnState: TransactionStatus =
      status == 'idle'
         ? 'IDLE'
         : status == 'pending'
            ? 'PREPARED'
            : result
               ? 'CONFIRMED'
               : 'SENT'

   useEffect(() => {
      if (txnState == 'CONFIRMED') {
         refetch()
      }
   }, [result, txnState, refetch])



   if (txnState == 'CONFIRMED' && transactionHash) {
      return <div>NPC Turned on! {transactionHash}</div>
   } else if (txnState == 'SENT') {
      return <div>{`Turning on...`}</div>
   } else {
      return (
         <div>
            <button
               className='w-fit pp-sans py-2 px-4 bg-white hover:bg-gray-100 text-blue-800  border border-blue-500 rounded 
               text-2xl font-bold leading-[.75] shadow-[0.75px_2px_0_0_#AAA]  ease-in-out transition-all active:shadow-none active:translate-x-[0.75px] active:translate-y-[2px]'
               onClick={() => {
                  writeContract({
                     chainId: currentChainID(),
                     address: deploys.erc6551Registry as Address,
                     abi: ERC6551RegistryABI,
                     functionName: 'createAccount',
                     args: [
                        deploys.erc6551AccountImpl as Address, //implementation
                        '0x0000000000000000000000000000000000000000000000000000000000000000', // salt
                        BigInt(currentChainID()), // chainId
                        deploys['NPC(721)'] as Address,
                        BigInt(tokenID),
                     ],
                  })
               }}
            >
               {`Turn On Noun PC #${tokenID}`}
            </button>
            {/*isError && (
               <div className='text-xs text-red-500 font-mono overflow-clip'>
                  {error?.message.substring(0, 50)}
               </div>
            )*/}
            <CustomConnectButton />
         </div>
      )
   }
}
