import AllParts from '@/components/AllParts'
import { CustomConnectButton } from '@/components/CustomConnectButton'
import HeroComponent from '@/components/HeroComponent'
import { PrimaryTabs } from '@/components/PrimaryTabs'

export default function Home() {
   return (
      <main className='flex flex-col items-start w-full'>
         <CustomConnectButton />
         <HeroComponent />
      </main>
   )
}
