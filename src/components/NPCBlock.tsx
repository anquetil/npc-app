'use client'

import useGetNPC from "@/hooks/useGetNPC"
import { isAddressEqual } from "viem"
import { useAccount } from "wagmi"
import AllParts from "./AllParts"
import Cart from "./Cart"
import MintNPCButton from "./MintNPCButton"
import DeployNPCButton from "./DeployNPCButton"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NPCBlock({
   id,
}: {
   id: string
}) {
   const [refresh, setRefresh] = useState(false) // used to clear cache in parent
   const { npc, loading } = useGetNPC(id, true, refresh)
   const { address } = useAccount()
   const router = useRouter()
   console.log('in NPCBLOCK', npc)
   if(npc){
      const { deployed, owner } = npc
      const isOwner = address && isAddressEqual(address, owner) // current address is owner
      return (
         <div>
            {deployed ? (
               <div>
                  here is your npc
                  {npc.TBAAddress}
                  <AllParts />
                  <Cart />
               </div>
            ) : (
               <div>
                  {`This NPC hasn't been setup yet. Deploy it to start buying traits`}
                     <DeployNPCButton tokenID={npc.id} callback={() => { setRefresh(true) }} />
               </div>
            )}
         </div>
      )
   }
}
