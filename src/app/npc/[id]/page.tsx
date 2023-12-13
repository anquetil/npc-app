import NPCBlock from '@/components/NPCBlock'

export default async function NPCPage({ params }: { params: { id: string } }) {
   // const { address } = useAccount()
   const { id } = params
   if (id && id !== '' && !isNaN(Number(id.toString()))) {
      return (
         <main className='flex flex-col items-start w-full'>
            <NPCBlock id={id} />
         </main>
      )
   } else {
      return <div>404, not a valid id</div>
   }
}
