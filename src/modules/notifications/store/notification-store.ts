import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ENotificationType } from '~/lib/api/types'

interface INotificationStore {
  notificationID: string | null
  setNotificationID: (id: string | null) => void
  notificationType: ENotificationType | null
  setNotificationType: (type: ENotificationType | null) => void
}

const initialState = {
  notificationID: null,
  notificationType: null,
}

export const useNotificationsStore = create<INotificationStore>()(
  devtools((set) => ({
    ...initialState,
    setNotificationID: (id) => {
      set({ notificationID: id })
    },
    setNotificationType: (type) => {
      set({ notificationType: type })
    },
  })),
)
