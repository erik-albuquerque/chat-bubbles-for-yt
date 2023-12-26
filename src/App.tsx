import { Chat } from './components/Chat'
import { DraftBubble } from './components/Chat/components/DraftBubble'
import { FactoryBubbles } from './components/Chat/components/FactoryBubbles'
import { useChat } from './hooks/use-chat'

function App() {
	const { chatHistory, showDraftBubble, onDraftBubbleChange, draftBubble } =
		useChat()

	return (
		<main className="flex h-screen w-screen items-end">
			<Chat>
				<FactoryBubbles bubbles={chatHistory} />

				<DraftBubble
					value={draftBubble}
					isVisible={showDraftBubble}
					onValueChange={onDraftBubbleChange}
				/>
			</Chat>
		</main>
	)
}

export default App
