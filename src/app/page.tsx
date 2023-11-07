import AllParts from "@/components/AllParts";
import Cart from "@/components/Cart";

export default function Home() {
   return (
      <main className='flex min-h-screen flex-col items-start p-12'>
         <Cart />
         <AllParts/>
      </main>
   )
}
