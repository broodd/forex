import { onlyDigitsDotPattern, onlyDigitsPattern, inputNamePattern } from './reg-exp'

interface ScrollAction {
  el: Element
  top: number
  left: number
}

export const scrollToFirstError = (actions: ScrollAction[]) => {
  if (!actions.length) {
    return
  }
  const [{ el, top, left }] = actions
  el.scrollTop = top - 50
  el.scrollLeft = left
}

export const validateInputWithFractionalNumbers = (
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (
    event.key === 'Tab' ||
    (event.ctrlKey && (event.key === 'c' || event.key === 'v' || event.key === 'a'))
  ) {
    return
  }
  if (!onlyDigitsDotPattern.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault()
  }
}

export const validateInputNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    event.key === 'Tab' ||
    (event.ctrlKey && (event.key === 'c' || event.key === 'v' || event.key === 'a'))
  ) {
    return
  }
  if (!onlyDigitsPattern.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault()
  }
}

export const validateInputWithoutSpecialCharactersExceptHyphenSpace = (
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  if (
    event.key === 'Tab' ||
    (event.ctrlKey && (event.key === 'c' || event.key === 'v' || event.key === 'a'))
  ) {
    return
  }

  if (!inputNamePattern.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault()
  }
}
