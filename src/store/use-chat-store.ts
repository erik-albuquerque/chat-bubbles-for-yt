import { v4 as uuid } from 'uuid'
import { create } from 'zustand'

import { BubbleType } from '../types/bubble'

enum TimerValues {
	SHORT = 500, // 500 ms
	LONG = 3000 // 3 sec
}

interface ChatStore {
	chatHistory: BubbleType[]
	draftBubble: string
	showDraftBubble: boolean
	isBubbleVisible: boolean
	getTimerDuration: () => number
	onSendBubble: (event: KeyboardEvent) => void
	onDraftBubbleChange: (value: string) => void
	toggleBubbleVisibility: () => void
}

const useChatStore = create<ChatStore>((set, get) => ({
	chatHistory: [] as BubbleType[],
	draftBubble: '',
	showDraftBubble: false,
	isBubbleVisible: true,
	getTimerDuration: (): number => {
		const { chatHistory } = get()
		const chatHistoryLength = chatHistory.length
		return chatHistoryLength >= 3 ? TimerValues.SHORT : TimerValues.LONG
	},
	onSendBubble: (event: KeyboardEvent): void => {
		const { code } = event
		const isEnterCode = code === 'Enter'

		set((state) => {
			const { draftBubble } = state

			return {
				...state,
				showDraftBubble: true,
				...(isEnterCode && draftBubble.trim() !== ''
					? {
							chatHistory: [
								...state.chatHistory,
								{ id: uuid(), content: draftBubble, isVisible: true }
							],
							draftBubble: '',
							showDraftBubble: false
						}
					: {})
			}
		})
	},
	onDraftBubbleChange: (value: string): void => {
		set({ draftBubble: value })
	},
	toggleBubbleVisibility: (): void => {
		set((state) => {
			const { chatHistory, isBubbleVisible } = state

			return {
				...state,
				chatHistory: isBubbleVisible
					? chatHistory.slice(1)
					: [{ ...chatHistory[0], isVisible: false }, ...chatHistory.slice(1)],
				isBubbleVisible: !isBubbleVisible
			}
		})
	}
}))

export { useChatStore }
