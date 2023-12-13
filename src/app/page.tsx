import { CustomConnectButton } from '@/components/CustomConnectButton'
import HeroComponent from '@/components/HeroComponent'

export default function Home() {
   return (
      <main className='flex flex-col items-start w-full'>
         <CustomConnectButton />
         <HeroComponent />
      </main>
   )
}
