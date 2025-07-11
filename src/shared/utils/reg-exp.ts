/**
 * Min 8 characters
 * Max 64 characters
 * Min 1 number
 * Min 1 uppercase letter
 * Min 1 lowercase letter
 */
export const AUTH_PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,64}$/

export const onlyDigitsPattern = /^[0-9]*$/
export const onlyDigitsDotPattern = /^[0-9.]+$/

export const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
export const inputNamePattern = /^[a-zA-Z -]+$/
