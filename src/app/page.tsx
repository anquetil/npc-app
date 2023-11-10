import HeroComponent from '@/components/HeroComponent'
import { PrimaryTabs } from '@/components/PrimaryTabs'

export default function Home() {
   return (
      <main className='flex flex-col items-start w-full  p-4 sm:p-12 pb-16 sm:pb-32'>
         <HeroComponent />
         <PrimaryTabs />
      </main>
   )
}
