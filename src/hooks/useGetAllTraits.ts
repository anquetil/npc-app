import { Trait } from '@/types/TraitType'
import { gql, useQuery } from '@apollo/client'

export default function useGetAllTraits() {
   const query = gql`
      query TraitQuery {
         traits(first: 200) {
            id
            name
            rleBytes
            svg
            type
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
