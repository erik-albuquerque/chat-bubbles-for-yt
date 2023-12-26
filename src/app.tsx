import { Chat } from './components/chat'
import { DraftBubble } from './components/chat/components/draft-bubble'
import { FactoryBubbles } from './components/chat/components/factory-bubbles'
import { useChat } from './hooks/use-chat'

const App = () => {
	const { chatHistory, showDraftBubble, onDraftBubbleChange } = useChat()

	return (
		<main className="flex h-screen w-screen items-end">
			<Chat>
				<FactoryBubbles bubbles={chatHistory} />

				<DraftBubble
					isVisible={showDraftBubble}
					onValueChange={onDraftBubbleChange}
				/>
			</Chat>
		</main>
	)
}

export { App }
