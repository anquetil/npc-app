import { initializeStore } from '@/utils/svg'
import { create } from 'zustand'

interface CartState {
   items: Map<string, number>
   add: (item: string) => void
   remove: (item: string) => void
   clear: () => void
}

export const useCartStore = create<CartState>()((set) => ({
   items: new Map(),
   remove: (item) =>
      set((state) => {
         // can only be 0 or 1
         return { items: state.items.set(item, 0) }
      }),
   add: (item) =>
      set((state) => {
         // can only be 0 or 1
         return { items: state.items.set(item, 1) }
      }),
   clear: () => set(() => {return {items: new Map()}})
}))
