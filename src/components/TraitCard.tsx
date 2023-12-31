'use client'
import { erc1155railsABI } from '@/abis/erc1155railsABI'
import { tempEquipABI } from '@/abis/tempEquipABI'
import { NPC } from '@/types/NPCType'
import { Trait } from '@/types/TraitType'
import { deploys } from '@/utils/addresses'
import { currentChainID } from '@/utils/chainFuncs'
import { dataTo64SVG } from '@/utils/svg'
import Image from 'next/image'
import { parseAbiItem } from 'viem'
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi'

export default function TraitCard({ trait, npc }: { trait: Trait; npc: NPC }) {
   const ownedTrait = npc.ownedTraits.find(ot => ot.tokenID.toString() == trait.id)
   const quantityOwned = ownedTrait ? ownedTrait.quantity : 0
   const isEquipped = npc.equippedTraits.includes(trait.id)

   const { config: mintConfig } = usePrepareContractWrite({
      chainId: currentChainID(),
      address: deploys['Trait(1155)'] as Address,
      abi: erc1155railsABI,
      functionName: 'mintTo',
      args: [npc.id, BigInt(trait.id), 1n], //TBAaddress , tokenID, value (qty)
   })
   const { write: mint, data, isSuccess: sentTransaction } = useContractWrite(mintConfig)

   const { config: equipConfig } = usePrepareContractWrite({
      chainId: currentChainID(),
      address: deploys['Trait(1155)'] as Address,
      abi: tempEquipABI,
      functionName: 'ext_addTokenId',
      args: [npc.id, BigInt(trait.id), 0n], //TBAaddress , tokenID, position
      enabled: quantityOwned > 0 && !isEquipped
   })
   const { write: equip, data: equipData, isSuccess: sentTransactionEquip } = useContractWrite(equipConfig)

   const { config: unequipConfig } = usePrepareContractWrite({
      chainId: currentChainID(),
      address: deploys['Trait(1155)'] as Address,
      abi: tempEquipABI,
      functionName: 'ext_removeTokenId',
      args: [npc.id, BigInt(trait.id)], //TBAaddress , tokenID
      enabled: isEquipped
   })
   const { write: unequip, data: unequipData, isSuccess: sentTransactionUnequip } = useContractWrite(unequipConfig)


   if (sentTransaction) {
      console.log('sentTransaction: ', data)
   }

   return (
      <div className='m-1 flex flex-row items-center '>
         <div>ID #{trait.id} - {trait.name}</div>
         <Image
            width={80}
            height={80}
            alt={trait.name}
            src={dataTo64SVG(trait.rleBytes)}
         />
         <div>
            Owns {quantityOwned}
         </div>
         <button
            onClick={() => {
               mint?.()
            }} 
            className='px-2 py-1 h-fit mr-2 border bg-white hover:bg-gray-50'
         >
            Mint
         </button>
         <button
            className='px-2 py-1 h-fit border bg-white hover:bg-gray-50'
            onClick={() => {
               equip?.()
            }} 
         >Equip</button>
         {
            isEquipped && <button
               className='px-2 py-1 h-fit border bg-white hover:bg-gray-50'
               onClick={() => {
                  unequip?.()
               }}
            >Unequip</button>
         }
      </div>
   )
}
