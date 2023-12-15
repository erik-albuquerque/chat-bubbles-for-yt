import { useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { FactoryMessages } from './components/FactoryMessages'
import { Message } from './components/Message'
import { MessageType } from './types/Message'

function App() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>('')

  const onTyping = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== 'Enter') {
        setCurrentMessage((prevMessage) => prevMessage + e.key)
      } else if (currentMessage.trim() !== '') {
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
