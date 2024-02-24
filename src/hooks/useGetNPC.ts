import { NPC } from '@/types/NPCType'
import { gql, useQuery } from '@apollo/client'
import { numberToBytes, pad, bytesToString } from 'viem'

export default function useGetNPC(
   NPCID: number,
   enabled: boolean = true,
   ignoreCache: boolean = false
) {
   const query = gql`
      query NPCQuery($tokenId: String!) {
         nPC(id: $tokenId) {
            id
            owner
            deployed
            accountAddress
            ownedTraits {
               id
               tokenID
               quantity
               ownerID
            }
            equippedTraits
         }
      }
   `
   console.log(NPCID)
   // string to b
   const variables = { tokenId: String(NPCID) }
   const { data, error, loading, refetch } = useQuery(query, {
      variables,
      skip: !enabled,
      fetchPolicy: ignoreCache ? 'no-cache' : undefined,
   })

   const npc: NPC = data ? data.nPC : undefined

   return {
      npc,
      loading,
      refetch,
   }
}
