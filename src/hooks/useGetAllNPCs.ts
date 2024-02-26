import { NPC } from '@/types/NPCType'
import { gql, useQuery } from '@apollo/client'

export default function useGetAllNPCs() {
   const query = gql`
      query NPCQuery {
         nPCs(first: 100) {
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
            fullSVG
         }
      }
   `

   const { data, loading } = useQuery(query, {})

   const npcs: NPC[] = data ? data.nPCs : undefined

   return {
      npcs,
      loading,
   }
}
