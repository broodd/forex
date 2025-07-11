import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IWeeksStore {
  weekID: string | null
  setWeekID: (id: string | null) => void
}

const initialState = {
  weekID: null,
}

export const useWeeksStore = create<IWeeksStore>()(
  devtools((set) => ({
    ...initialState,
    setWeekID: (id) => {
      set({ weekID: id })
    },
  })),
)
