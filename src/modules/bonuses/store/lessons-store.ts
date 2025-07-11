import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ILessonsStore {
  lessonID: string | null
  setLessonID: (id: string | null) => void
}

const initialState = {
  lessonID: null,
}

export const useLessonsStore = create<ILessonsStore>()(
  devtools((set) => ({
    ...initialState,
    setLessonID: (id) => {
      set({ lessonID: id })
    },
  })),
)
