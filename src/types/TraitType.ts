import { Address } from 'viem'

export type Trait = {
   id: string
   name: string
   rleBytes: string
   svg: string
}

export type OwnedTrait = {
   id: string // TBA address-tokenID
   tokenID: bigint
   quantity: number
   ownerID: Address // TBA address
}
