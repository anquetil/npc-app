import { Address } from 'viem'
import { OwnedTrait } from './TraitType'

export type NPC = {
   id: Address
   owner: Address
   deployed: boolean
   TBAAddress: Address
   tokenID: number
   ownedTraits: OwnedTrait[]
}
