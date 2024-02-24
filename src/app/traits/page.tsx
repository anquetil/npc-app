const getTraits = async () => {
   const query = `
    query NPCQuery {
       traits(first: 200) {
          id
          name
          rleBytes
          svg
       }
    }
 `
   const graphqlRequest = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
   }

   const data = await fetch('http://localhost:42069', graphqlRequest)
   const json = await data.json()
   return json.data.traits as {
      id: string
      name: string
      rleBytes: string
      svg: string
   }[]
}

const TraitsPage = async () => {
   const traits = await getTraits()
   return (
      <div>
         <h1>traits</h1>
         <div className='grid grid-cols-4 gap-4'>
            {traits.map((trait) => {
               return (
                  <div>
                     <h2>{trait.name}</h2>
                     {/* image with base64 encoding */}
                     <img src={`data:image/svg+xml;base64,${trait.svg}`} />
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default TraitsPage
