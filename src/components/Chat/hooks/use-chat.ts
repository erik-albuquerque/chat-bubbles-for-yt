import { useState, useCallback, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import {
  BACKSPACE_KEY_CODE,
  ENTER_KEY_CODE,
  SPECIAL_KEYS
} from '../../../constants'
import { MessageType } from '../../../types/Message'

const useChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>('')

  const onTyping = useCallback(
    ({ code, key }: KeyboardEvent) => {
      switch (code) {
        case BACKSPACE_KEY_CODE:
          setCurrentMessage((prevMessage: string) => prevMessage.slice(0, -1))
          break

        case ENTER_KEY_CODE:
          if (key.trim() !== '') {
            const messageId = uuid()
            setMessages((prevMessages: MessageType[]) => [
              ...prevMessages,
              {
                id: messageId,
                content: currentMessage
              }
            ])
            setCurrentMessage('')
          }
          break

        default:
          if (!SPECIAL_KEYS.includes(code) && key.length === 1) {
            setCurrentMessage((prevMessage: string) => prevMessage + key)
          }
          break
      }
    },
    [currentMessage]
  )

  useEffect(() => {
    window.addEventListener('keydown', onTyping)

    return () => window.removeEventListener('keydown', onTyping)
  }, [onTyping])

  return {
    messages,
    currentMessage
  }
}

export { useChat }
