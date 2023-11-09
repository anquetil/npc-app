import AllParts from '@/components/AllParts'
import Cart from '@/components/Cart'
import HeroComponent from '@/components/HeroComponent'
import { categories } from '../utils/svg'

export default function Home() {
   return (
      <main className='flex flex-col items-start p-12'>
         <Cart />
         <HeroComponent />
         <AllParts categories={categories} />
      </main>
   )
}
