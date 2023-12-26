import { useEffect } from 'react'

import { useChatStore } from '../store/use-chat-store'

const useChat = () => {
	const {
		chatHistory,
		draftBubble,
		onSendBubble,
		isBubbleVisible,
		getTimerDuration,
		toggleBubbleVisibility,
		showDraftBubble,
		onDraftBubbleChange
	} = useChatStore()

	useEffect(() => {
		const timerId = setTimeout(() => {
			toggleBubbleVisibility()
		}, getTimerDuration())

		window.addEventListener('keydown', onSendBubble)

		return () => {
			clearTimeout(timerId)
			window.removeEventListener('keydown', onSendBubble)
		}
	}, [getTimerDuration, onSendBubble, isBubbleVisible, toggleBubbleVisibility])

	return {
		chatHistory,
		draftBubble,
		showDraftBubble,
		onDraftBubbleChange
	}
}

export { useChat }
