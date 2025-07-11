import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IRecipesStore {
  recipeID: string | null
  setRecipeID: (id: string | null) => void
}

const initialState = {
  recipeID: null,
}

export const useRecipesStore = create<IRecipesStore>()(
  devtools((set) => ({
    ...initialState,
    setRecipeID: (id: string | null) => {
      set({ recipeID: id })
    },
  })),
)
