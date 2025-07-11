import { create } from 'zustand'

interface UploadState {
  isUploadLoading: boolean
  setIsUploadLoading: (loading: boolean) => void
  resetUploadLoadingProgress: () => void
}

export const useUploadStore = create<UploadState>((set) => ({
  isUploadLoading: false,
  setIsUploadLoading: (loading) => set({ isUploadLoading: loading }),
  resetUploadLoadingProgress: () => set({ isUploadLoading: false }),
}))
