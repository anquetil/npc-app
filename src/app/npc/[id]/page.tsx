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



async function getData(id: number){
   const testNet = process.env.NEXT_PUBLIC_TESTNET == 'TRUE'
   const client = createPublicClient({
      chain: testNet ? goerli : base,
      transport: http(
            testNet
               ? 'https://eth-goerli.g.alchemy.com/v2/ms7Bky_S-uXy8BQ25h8iaXJLmPMK72CX'
               : 'https://base-mainnet.g.alchemy.com/v2/SNJqxMeC1KMW3q8ZQTOBEr9zyNMmDC8I'?? '',
      ),
   })

   const isDeployed = await client.readContract({
      abi: ERC6551RegistryABI,
      address: deploys.erc6551Registry as Address,
      functionName: "account",
      args: [
         deploys.erc6551AccountImpl as Address,
         "0x0000000000000000000000000000000000000000000000000000000000000000", //bytes32(0)
         5n, // goerli id
         deploys['NPC(721)'] as Address,
         BigInt(id)
      ]
   }) // returns an address no matter what, so will need to check the grpah

   console.log(isDeployed)

   return isDeployed
}

export default async function NPCPage({ params }: { params: { id: string } }) {
   // const { address } = useAccount()
   const { id } = params;
   const isDeployed = await getData(id)
   const isOwner = true // current address is owner
   return (
      <main className='flex flex-col items-start w-full'>
         {isDeployed ? (
            <div>
               here is your npc
               <AllParts />
               <Cart />
            </div>
         ) : (
            <div>
               {`This NPC hasn't been setup yet. Deploy it to start buying traits`}
               <MintNPCButton />
            </div>
         )}
      </main>
   )
}
