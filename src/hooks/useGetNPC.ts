import { NPC } from '@/types/NPCType'
import { gql, useQuery } from '@apollo/client'
import { Address } from 'viem'

export default function useGetNPC(
   NPCID: Address,
   enabled: boolean = true,
   ignoreCache: boolean = false
) {
   const query = gql`
   query NPCQuery {
      nPC(
         id: "${NPCID}"
      ){
         id
         tokenID
         owner
         deployed
         ownedTraits {
               id
               tokenID
               quantity
               ownerID
         }
         equippedTraits
      }
   }`
   const { data, loading } = useQuery(query, {
      skip: !enabled,
      fetchPolicy: ignoreCache ? 'no-cache' : undefined,
   })

   const npc: NPC = data ? data.nPC : undefined

   return {
      npc,
      loading,
   }
}
