import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ICoursesStore {
  courseID: string | null
  setCourseID: (id: string | null) => void
}

const initialState = {
  courseID: null,
}

export const useCoursesStore = create<ICoursesStore>()(
  devtools((set) => ({
    ...initialState,
    setCourseID: (id) => {
      set({ courseID: id })
    },
  })),
)
