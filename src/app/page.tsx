import AllParts from '@/components/AllParts'
import Cart from '@/components/Cart'
import HeroComponent from '@/components/HeroComponent'
import { categories } from '../utils/svg'
import NPCRenderer from '@/components/NPCRenderer'

export default function Home() {
   return (
      <main className='flex flex-col items-start w-full  p-4 sm:p-12 pb-16 sm:pb-32'>
         <NPCRenderer />
         <HeroComponent />
         <AllParts categories={categories} />
      </main>
   )
}
