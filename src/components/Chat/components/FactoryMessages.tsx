import { FC } from 'react'

import { MessageType } from '../../../types/Message'
import { Message } from './Message'

type FactoryMessagesProps = {
  messages: MessageType[]
}

const FactoryMessages: FC<FactoryMessagesProps> = ({ messages }) => {
  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </>
  )
}

export { FactoryMessages }
