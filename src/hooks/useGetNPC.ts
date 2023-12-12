import { NPC } from '@/types/NPCType'
import { gql, useQuery } from '@apollo/client'

export default function useGetNPC(NPCID: string, enabled: boolean = true, ignoreCache: boolean = false) {
   const query = gql`query NPCQuery {
      npc(
            id: ${NPCID}
      ){
         id
         owner
         deployed
         TBAAddress
      }
   }`
   

   const { data, loading } = useQuery(query, {
      skip: !enabled, 
      fetchPolicy: ignoreCache ? "no-cache" : undefined
   })

   const npc: NPC = data ? data.npc : undefined

   return {
      npc,
      loading,
   }
}