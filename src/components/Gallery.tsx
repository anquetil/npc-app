'use client'

import useGetNPC from '@/hooks/useGetNPC'
import { isAddressEqual } from 'viem'
import { useAccount, useEnsName } from 'wagmi'
import AllParts from './AllParts'
import Cart from './Cart'
import DeployNPCButton from './DeployNPCButton'
import { useState } from 'react'
import NPCRenderer from './NPCRenderer'
import { Addreth } from 'addreth'
import useGetAllNPCs from '@/hooks/useGetAllNPCs'
import { isTestNet } from '@/utils/chainFuncs'
import Link from 'next/link'
import BasicENSLabel from './BasicENSLabel'

export default function Gallery() {
   const { npcs } = useGetAllNPCs();
   if (npcs) {
      const orderedNPCs = [...npcs].sort((a,b) => Number(b.id) - Number(a.id))
      return (
         <div className='px-6 flex flex-wrap gap-4'>
            {orderedNPCs.map(n => (
               <Link className='bg-gray-50 flex flex-col w-28' href={`/npc/${n.id}`} key={n.id}>
                  <div>img</div>
                  <div>{`NPC #${n.id}`}</div>
                  <div className='text-gray-700 text-sm'><BasicENSLabel address={n.owner} /></div>
               </Link>
            ))}
         </div>
      )
   } else {
      <div>Error fetching NPCs</div>
   }
}
