'use client'

import useGetNPC from '@/hooks/useGetNPC'
import { isAddressEqual } from 'viem'
import AllParts from './AllParts'
import DeployNPCButton from './DeployNPCButton'
import { useState } from 'react'
import NPCRenderer from './NPCRenderer'
import { Addreth } from 'addreth'
import { computeAccount } from '@/utils/computeERC6551Address'
import { deploys } from '@/utils/addresses'
import { currentChainID, isTestNet } from '@/utils/chainFuncs'
import useGetAllTraits from '@/hooks/useGetAllTraits'
import { Address } from 'viem'
import {
   useAccount,
   useContractWrite,
   useNetwork,
   usePrepareContractWrite,
   useWaitForTransaction,
} from 'wagmi'
import { ERC6551RegistryABI } from '../abis/erc6551RegistryABI'

export default function NPCBlock({ tokenID }: { tokenID: string }) {
   const chainID = process.env.NEXT_PUBLIC_TESTNET ? 11155111 : 8453
   const testNet = isTestNet()
   const [refresh, setRefresh] = useState(false) // used to clear cache in parent
   const { npc, refetch } = useGetNPC(parseInt(tokenID), true, refresh)
   console.log(
      computeAccount(
         deploys['NPC(721)'],
         tokenID,
         currentChainID(),
         deploys.erc6551AccountImpl,
         deploys.erc6551Registry
      )
   )
   console.log('This is our NPC:', npc)
   const { traits } = useGetAllTraits()
   const { address } = useAccount()

   const { config: mintConfig } = usePrepareContractWrite({
      chainId: chainID,
      address: deploys['erc6551Registry'] as Address,
      abi: ERC6551RegistryABI,
      functionName: 'createAccount',
      // args:
      // implementation: Address
      // salt Bytes32
      // chainId: Uint256
      // tokenContract: Address
      // tokenId: Uint256
      args: [
         deploys['erc6551AccountImpl'],
         '0x0000000000000000000000000000000000000000000000000000000000000000',
         BigInt(chainID),
         deploys['NPC(721)'],
         BigInt(tokenID),
      ],
   })

   const {
      write,
      data,
      isSuccess: sentTransaction,
      isError,
      error,
   } = useContractWrite(mintConfig)

   const deployAccount = () => {
      write?.()
   }

   if (npc && traits) {
      const { deployed, owner } = npc
      const isOwner = address && isAddressEqual(address, owner) // current address is owner
      return (
         <div className='bg-white'>
            <div className='pp-sans text-6xl text-gray-800 bg-gray-100 px-6 -mb-2 mt-1'>{`Noun PC #${tokenID}`}</div>
            <div className='text-gray-700 bg-gray-100 pb-3 mb-3 px-6'>
               {`Owner: `}
               <Addreth
                  icon={false}
                  address={npc.owner}
                  actions='none'
                  theme={{
                     textColor: 'rgb(55,65,81)',
                     badgeBackground: 'rgb(243 244 246)',
                     badgeGap: 0,
                  }}
                  explorer={(address) => ({
                     name: testNet ? 'Sepoliascan' : 'Basescan',
                     accountUrl: testNet
                        ? `https://sepolia.etherscan.io/address/${address}`
                        : `https://basescan.com/address/${address}`,
                  })}
               />
               {deployed && <div>{npc.TBAAddress}</div>}
            </div>
            {deployed ? (
               <div className='px-6'>
                  {true ? (
                     <div>
                        <div className='flex flex-col-reverse sm:flex-row'>
                           <AllParts npc={npc} refetch={refetch} />
                           <NPCRenderer npc={npc} />
                        </div>
                     </div>
                  ) : (
                     <NPCRenderer npc={npc} />
                  )}
               </div>
            ) : (
               <div className='px-6'>
                  {`This NPC hasn't been setup yet. If this is yours, turn it on to start buying traits`}
                  <DeployNPCButton tokenID={npc.id} refetch={refetch} />
               </div>
            )}
         </div>
      )
   } else {
      return (
         <main className='px-4'>
            <h3>NPC has not deployed 6551 account</h3>
            <button
               className='border rounded px-2 py-1'
               onClick={() => {
                  deployAccount()
               }}
            >
               Deploy account
            </button>
         </main>
      )
   }
}
