import { ERC6551RegistryABI } from '@/abis/erc6551RegistryABI'
import AllParts from '@/components/AllParts'
import Cart from '@/components/Cart'
import MintNPCButton from '@/components/MintNPCButton'
import { deploys } from '@/utils/addresses'
import { Address, useAccount, useContractRead } from 'wagmi'
import { getPublicClient } from '@wagmi/core'
import { wagmiConfig } from '@/app/providers'
import { createPublicClient, http } from 'viem'
import { base, goerli } from 'viem/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import useGetNPC from '@/hooks/useGetNPC'
import NPCBlock from '@/components/NPCBlock'

export default async function NPCPage({ params }: { params: { id: string } }) {
   // const { address } = useAccount()
   const { id } = params
   if (id && id !== '' && !isNaN(Number(id.toString()))) {
      return (
         <main className='flex flex-col items-start w-full'>
            <div>toolbar</div>
            <NPCBlock id={id} />
         </main>
      )
   } else {
      return <div>404, not a valid id</div>
   }
}
