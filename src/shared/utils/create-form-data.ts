/* eslint-disable @typescript-eslint/no-explicit-any */
export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'boolean' || typeof value === 'number') {
        formData.append(key, value.toString())
      } else if (typeof value === 'string') {
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          formData.append(`${key}`, '[]')
        } else {
          value.forEach((item) => {
            if (item instanceof File) {
              formData.append(`${key}`, item)
            } else if (typeof item === 'string') {
              formData.append(key, item)
            } else {
              const fileBlob = new Blob([JSON.stringify({ id: item.id })], {
                type: 'application/json',
              })
              formData.append(`${key}`, fileBlob)
            }
          })
        }
      } else if (value instanceof File) {
        formData.append(key, value)
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value))
      }
    }
  })

  return formData
}
