import { NPC } from '@/types/NPCType'
import { gql, useQuery } from '@apollo/client'

export default function useGetAllNPCs() {
   const query = gql`query NPCQuery {
      npcs(
         first: 100
      ){
         id
         owner
         deployed
         TBAAddress
      }
   }`

   const { data, loading } = useQuery(query, {})

   const npcs: NPC[] = data ? data.npcs : undefined

   return {
      npcs,
      loading,
   }
}
