import { Address } from "viem"

export type NPC = {
   id: number,
   owner: Address,
   deployed: boolean,
   TBAAddress?: Address,
}