import { initializeStore } from '@/utils/svg'
import { create } from 'zustand'

interface CartState {
   items: Map<string, number>
   add: (item: string) => void
   remove: (item: string) => void
}

export const useCartStore = create<CartState>()((set) => ({
   items: new Map(),
   remove: (item) =>
      set((state) => {
         const currentCount = state.items.get(item)
         const newCount =
            currentCount == undefined || currentCount == 0 ? 0 : currentCount
         return { items: state.items.set(item, newCount) }
      }),
   add: (item) =>
      set((state) => {
         const currentCount = state.items.get(item)
         const newCount = currentCount == undefined ? 1 : currentCount + 1
         return { items: state.items.set(item, newCount) }
      }),
}))
