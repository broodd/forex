export const KEEP_LOG_IN_KEY = 'keepLogIn'
export const TOKEN_KEY = 'token'
export const REFRESH_TOKEN_KEY = 'refreshToken'
export const SUPER_KEY = 'isSuper'
export const RESEND_TIME_KEY = 'resendTime'
export const LANG_KEY = 'lang'

class StorageService {
  isKeepLogIn = () => {
    // uncomment row below if you have checkbox keep log in on sign in page
    // return Boolean(localStorage.getItem(KEEP_LOG_IN_KEY))
    return true
  }

  getFromStorage = (key: string) => {
    if (!localStorage || !sessionStorage) {
      return null
    }
    if (key === KEEP_LOG_IN_KEY || this.isKeepLogIn()) {
      return localStorage.getItem(key)
    }
    return sessionStorage.getItem(key)
  }

  setToStorage = (key: string, value: string) => {
    if (!localStorage || !sessionStorage) {
      return null
    }
    if (key === KEEP_LOG_IN_KEY || this.isKeepLogIn()) {
      localStorage.setItem(key, value)
    } else {
      sessionStorage.setItem(key, value)
    }
  }

  removeFromStorage = (key: string) => {
    if (!localStorage || !sessionStorage) {
      return null
    }
    if (this.getFromStorage(key)) {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    }
  }
}

export default new StorageService()
