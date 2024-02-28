'use client'
import { erc1155railsABI } from '@/abis/erc1155railsABI'
import { freeMintControllerABI } from '@/abis/freeMintControllerABI'
import { tempEquipABI } from '@/abis/tempEquipABI'
import { NPC } from '@/types/NPCType'
import { refetchFn } from '@/types/RefetchType'
import { Trait } from '@/types/TraitType'
import { TransactionStatus } from '@/types/TransactionStatusType'
import { deploys } from '@/utils/addresses'
import { currentChainID } from '@/utils/chainFuncs'
import { filenameToHumanReadable } from '@/utils/traitNames'
import Image from 'next/image'
import { Address, parseEther } from 'viem'
import {
   usePrepareTransactionRequest,
   useSimulateContract,
   useWaitForTransactionReceipt,
   useWriteContract,
} from 'wagmi'

export default function TraitCard({
   trait,
   npc,
   refetch,
}: {
   trait: Trait
   npc: NPC
   refetch: refetchFn
}) {
   const ownedTrait = npc.ownedTraits.find((ot) => ot.tokenID.toString() == trait.id)
   const quantityOwned = ownedTrait ? ownedTrait.quantity : 0
   const isEquipped = npc.equippedTraits?.includes(trait.id)

   // MINT
   const {
      writeContract: writeMint,
      status: statusMint,
      data: hashMint,
   } = useWriteContract()
   const { data: resultMint } = useWaitForTransactionReceipt({
      hash: hashMint,
   })
   const stateMint: TransactionStatus =
      statusMint == 'idle'
         ? 'IDLE'
         : statusMint == 'pending'
         ? 'PREPARED'
         : resultMint
         ? 'CONFIRMED'
         : 'SENT'

   // EQUIP
   const {
      writeContract: writeEquip,
      status: statusEquip,
      data: hashEquip,
   } = useWriteContract()
   const { data: resultEquip } = useWaitForTransactionReceipt({
      hash: hashEquip,
   })
   const stateEquip: TransactionStatus =
      statusEquip == 'idle'
         ? 'IDLE'
         : statusEquip == 'pending'
         ? 'PREPARED'
         : resultEquip
         ? 'CONFIRMED'
         : 'SENT'

   // UNEQUIP
   const {
      writeContract: writeUnequip,
      status: statusUnequip,
      data: hashUnequip,
   } = useWriteContract()
   const { data: resultUnequip } = useWaitForTransactionReceipt({
      hash: hashUnequip,
   })

   const stateUnequip: TransactionStatus =
      statusUnequip == 'idle'
         ? 'IDLE'
         : statusUnequip == 'pending'
         ? 'PREPARED'
         : resultUnequip
         ? 'CONFIRMED'
         : 'SENT'

   // IF SOMETHING IS CONFIRMED, REFRESH

   if (
      stateMint == 'CONFIRMED' ||
      stateEquip == 'CONFIRMED' ||
      stateUnequip == 'CONFIRMED'
   ) {
      console.log('confirmed')
      refetch?.()
   }

   const attempt = useSimulateContract({
      chainId: currentChainID(),
      address: deploys.freeMintController as Address,
      abi: freeMintControllerABI,
      functionName: 'mint1155To',
      args: [deploys['Trait(1155)'] as Address, npc.id, BigInt(trait.id)], //collection, owner, tokenid
      value: parseEther('0.001'),
   })

   return (
      <div className='m-1 flex flex-col items-center border rounded p-2 w-56'>
         <div>
            {filenameToHumanReadable.get(trait.name)}
         </div>
         <Image
            className='bg-white fill-white'
            width={80}
            height={80}
            alt={trait.name}
            src={`data:image/svg+xml;base64,${trait.svg}`}
         />
         <div>{quantityOwned} owned</div>

         <div className='flex flex-row space-x-2'>
            <button
               onClick={() => {
                  console.log('here')
                  writeMint({
                     chainId: currentChainID(),
                     address: deploys.freeMintController as Address,
                     abi: freeMintControllerABI,
                     functionName: 'mint1155To',
                     args: [deploys['Trait(1155)'] as Address, npc.id, BigInt(trait.id)], //collection, owner, tokenid
                     value: parseEther('0.001'),
                  })
               }}
               className='px-2 py-1 h-fit mr-2 border rounded bg-white hover:bg-gray-100'
            >
               Mint
            </button>
            {quantityOwned > 0 && !isEquipped && (
               <button
                  className='px-2 py-1 h-fit border bg-white hover:bg-gray-50'
                  onClick={() => {
                     writeEquip({
                        chainId: currentChainID(),
                        address: deploys['Trait(1155)'] as Address,
                        abi: tempEquipABI,
                        functionName: 'ext_addTokenId',
                        args: [npc.id, BigInt(trait.id), 0n], //TBAaddress , tokenID, position
                     })
                  }}
               >
                  Equip
               </button>
            )}
            {isEquipped && (
               <button
                  className='px-2 py-1 h-fit border bg-white hover:bg-gray-50'
                  onClick={() => {
                     writeUnequip({
                        chainId: currentChainID(),
                        address: deploys['Trait(1155)'] as Address,
                        abi: tempEquipABI,
                        functionName: 'ext_removeTokenId',
                        args: [npc.id, BigInt(trait.id)], //TBAaddress , tokenID
                     })
                  }}
               >
                  Unequip
               </button>
            )}
         </div>

         <div>
            {(stateEquip == 'SENT' || stateUnequip == 'SENT' || stateMint == 'SENT') && (
               <div>Loading..</div>
            )}
         </div>
      </div>
   )
}
