import { useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { FactoryMessages } from './components/FactoryMessages'
import { Message } from './components/Message'
import { ENTER_KEY_CODE, BACKSPACE_KEY_CODE, specialKeys } from './constants'
import { MessageType } from './types/Message'

function App() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>('')

  const onTyping = useCallback(
    ({ code, key }: KeyboardEvent) => {
      switch (code) {
        case BACKSPACE_KEY_CODE:
          setCurrentMessage((prevMessage) => prevMessage.slice(0, -1))
          break

        case ENTER_KEY_CODE:
          if (key.trim() !== '') {
            const messageId = uuid()
            setMessages((prevMessages) => [
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
          if (!specialKeys.includes(code) && key.length === 1) {
            setCurrentMessage((prevMessage) => prevMessage + key)
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

  return (
    <main className="flex h-screen w-screen items-end">
      <div className="flex flex-col gap-2 pb-16 pl-4">
        <FactoryMessages messages={messages} />

        {currentMessage.trim() !== '' && (
          <Message data={{ content: currentMessage }} />
        )}
      </div>
    </main>
  )
}

export default App
