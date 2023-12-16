import { LeftSlideAnimation } from '../../animations/message'
import { FactoryMessages } from './components/FactoryMessages'
import { Message } from './components/Message'
import { useChat } from './hooks/use-chat'

const Chat = () => {
  const { messages, currentMessage } = useChat()
  const showCurrentMessage = currentMessage.trim() !== ''

  return (
    <div className="flex flex-col gap-2 pb-16 pl-4">
      <FactoryMessages messages={messages} />

      {showCurrentMessage && (
        <Message
          animate={LeftSlideAnimation}
          data={{ content: currentMessage }}
        />
      )}
    </div>
  )
}

export { Chat }
