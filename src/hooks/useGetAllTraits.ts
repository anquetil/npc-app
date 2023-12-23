import { Trait } from '@/types/TraitType'
import { gql, useQuery } from '@apollo/client'

export default function useGetAllNPCs() {
   const query = gql`
      query NPCQuery {
         traits(first: 200) {
            id
            name
            rleBytes
         }
      }
   `

   const { data, loading } = useQuery(query, {})

   const traits: Trait[] = data ? data.traits : undefined

   return {
      traits,
      loading,
   }
}
