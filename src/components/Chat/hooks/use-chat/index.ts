import { useEffect, useReducer } from 'react'

import { BACKSPACE_KEY_CODE, ENTER_KEY_CODE } from '../../../../constants'
import { chatReducer, ChatActionTypes } from './chatReducer'

const useChat = () => {
  const [{ messages, currentMessage }, dispatch] = useReducer(chatReducer, {
    messages: [],
    currentMessage: ''
  })

  const onKeyDown = ({ code, key }: KeyboardEvent) => {
    switch (code) {
      case BACKSPACE_KEY_CODE:
        dispatch({ type: ChatActionTypes.BACKSPACE })
        break
      case ENTER_KEY_CODE:
        dispatch({ type: ChatActionTypes.ENTER, key })
        break
      default:
        dispatch({ type: ChatActionTypes.DEFAULT, key, code })
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return {
    messages,
    currentMessage
  }
}

export { useChat }
