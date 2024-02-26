'use client'

import useGetNPC from '@/hooks/useGetNPC'
import { Address, isAddressEqual, parseAbi } from 'viem'
import { useAccount, useContractRead } from 'wagmi'
import AllParts from './AllParts'
import DeployNPCButton from './DeployNPCButton'
import { useState } from 'react'
import NPCRenderer from './NPCRenderer'
import { Addreth } from 'addreth'
import { computeAccount } from '@/utils/computeERC6551Address'
import { deploys } from '@/utils/addresses'
import { currentChainID, isTestNet } from '@/utils/chainFuncs'
import useGetAllTraits from '@/hooks/useGetAllTraits'

export default function NPCBlock({ tokenID }: { tokenID: string }) {
   const testNet = isTestNet()
   const [refresh, setRefresh] = useState(false) // used to clear cache in parent
   const { npc, refetch } = useGetNPC(
      computeAccount(
         deploys['NPC(721)'],
         tokenID,
         currentChainID(),
         deploys.erc6551AccountImpl,
         deploys.erc6551Registry
      ),
      true,
      refresh
   )

   const { data } = useContractRead({
      chainId: currentChainID(),
      address: deploys['Trait(1155)'] as Address,
      abi: parseAbi([
         'function ext_getEquippedTokenIds(address owner) public view returns (uint256[] memory)',
      ]),
      functionName: 'ext_getEquippedTokenIds',
      args: [npc?.id],
      enabled: npc != undefined,
   })

   const { traits } = useGetAllTraits()
   const { address } = useAccount()
   if (npc && traits) {
      const { deployed, owner } = npc
      const isOwner = address && isAddressEqual(address, owner) // current address is owner
      return (
         <div className='bg-white w-full'>
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
               {deployed && <div>{npc.id}</div>}
            </div>
            {deployed ? (
               <div className='px-6'>
                  {isOwner ? (
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
                  <DeployNPCButton tokenID={npc.tokenID} refetch={refetch} />
               </div>
            )}
         </div>
      )
   } else {
      ;<div>Error fetching NPC</div>
   }
}
