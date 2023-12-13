'use client'

import { ERC6551RegistryABI } from '@/abis/erc6551RegistryABI'
import { deploys } from '@/utils/addresses'
import { useRouter } from 'next/navigation'
import { Address } from 'viem'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { CustomConnectButton } from './CustomConnectButton'
import { currentChainID } from '@/utils/chainFuncs'

export default function DeployNPCButton({
   tokenID,
   callback,
}: {
   tokenID: number
   callback: () => void
}) {
   const { config: deployConfig } = usePrepareContractWrite({
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

   const { write, data, isSuccess: sentTransaction } = useContractWrite(deployConfig)

   const { isSuccess: deployedSuccess } = useWaitForTransaction({
      hash: data?.hash,
      onSuccess: callback, // callback needed to clear cache in useQuery in parent
   })

   if (deployedSuccess && data) {
      return <div>NPC Turned on! {data.hash}</div>
   } else if (sentTransaction) {
      return <div>{`Turning on...`}</div>
   } else {
      return (
         <div>
            <button
               className='w-fit pp-sans py-2 px-4 bg-white hover:bg-gray-100 text-blue-800  border border-blue-500 rounded 
               text-2xl font-bold leading-[.75] shadow-[0.75px_2px_0_0_#AAA]  ease-in-out transition-all active:shadow-none active:translate-x-[0.75px] active:translate-y-[2px]'
               onClick={() => {
                  write?.()
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
