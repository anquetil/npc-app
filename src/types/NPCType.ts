import { Address } from 'viem'
import { OwnedTrait } from './TraitType'

export type NPC = {
   id: Address
   owner: Address
   deployed: boolean
   tokenID: number
   ownedTraits: OwnedTrait[]
   equippedTraits: string[]
   fullSVG: string
}
