'use client'

import useGetNPC from '@/hooks/useGetNPC'
import { isAddressEqual } from 'viem'
import { useAccount } from 'wagmi'
import AllParts from './AllParts'
import Cart from './Cart'
import DeployNPCButton from './DeployNPCButton'
import { useState } from 'react'
import NPCRenderer from './NPCRenderer'
import { Addreth } from 'addreth'

export default function NPCBlock({ id }: { id: string }) {
   const testNet = process.env.NEXT_PUBLIC_TESTNET == 'TRUE'
   const [refresh, setRefresh] = useState(false) // used to clear cache in parent
   const { npc } = useGetNPC(id, true, refresh)
   const { address } = useAccount()
   console.log('in NPCBLOCK', npc)
   if (npc) {
      const { deployed, owner } = npc
      const isOwner = address && isAddressEqual(address, owner) // current address is owner
      return (
         <div className='bg-white'>
            <div className='pp-sans text-6xl text-gray-800 bg-gray-100 px-6 -mb-2 mt-1'>{`Noun PC #${id}`}</div>
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
                     name: testNet ? 'Goerliscan' : 'Basescan',
                     accountUrl: testNet
                        ? `https://goerli.etherscan.io/address/${address}`
                        : `https://basescan.com/address/${address}`,
                  })}
               />
               {deployed && <div>{npc.TBAAddress }</div>}
            </div>
            {deployed ? (
               <div className='px-6'>
                  {isOwner ? (
                     <div>
                        <div className='flex flex-col-reverse sm:flex-row'>
                           <AllParts />
                           <NPCRenderer id={Number(id)} />
                        </div>
                        <Cart />
                     </div>
                  ) : (
                     <NPCRenderer id={Number(id)} />
                  )}
               </div>
            ) : (
               <div className='px-6'>
                  {`This NPC hasn't been setup yet. If this is yours, turn it on to start buying traits`}
                  <DeployNPCButton
                     tokenID={npc.id}
                     callback={() => {
                        setRefresh(true)
                     }}
                  />
               </div>
            )}
         </div>
      )
   } else {
      <div>Error fetching NPC</div>
   }
}
