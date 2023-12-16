import { LeftSlideAnimation } from '../../animations/message'
import { FactoryMessages } from './components/FactoryMessages'
import { Message } from './components/Message'
import { useChat } from './hooks/use-chat'

const Chat = () => {
  const { chatHistory, draftMessage } = useChat()
  const showDraftMessage = draftMessage.trim() !== ''

  return (
    <div className="flex flex-col gap-2 pb-16 pl-4">
      <FactoryMessages messages={chatHistory} />

      {showDraftMessage && (
        <Message
          animate={LeftSlideAnimation}
          data={{ content: draftMessage }}
        />
      )}
    </div>
  )
}

export { Chat }
