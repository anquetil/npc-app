export function getNonZeroItems(cartItems: Map<string, number>) {
   const nonZeroItems: { filename: string; count: number }[] = []
   cartItems.forEach((count, filename) => {
      nonZeroItems.push({ filename: filename, count: count })
   })
   return nonZeroItems
}
