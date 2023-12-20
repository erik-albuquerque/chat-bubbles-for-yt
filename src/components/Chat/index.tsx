import { slideRightAnimation } from '../../animations/bubble'
import { useChat } from '../../hooks/use-chat'
import { Bubble } from './components/Bubble'
import { FactoryBubbles } from './components/FactoryBubbles'

const Chat = () => {
  const { chatHistory, draftBubble } = useChat()
  const showDraftBubble = draftBubble.trim() !== ''

  return (
    <div className="flex flex-col gap-2 pb-16 pl-4">
      <FactoryBubbles bubbles={chatHistory} />

      {showDraftBubble && (
        <Bubble data={{ content: draftBubble }} {...slideRightAnimation} />
      )}
    </div>
  )
}

export { Chat }
