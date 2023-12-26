import { useCallback, useMemo, useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import { BubbleType } from '../types/bubble'

enum TimerValues {
	SHORT = 500, // 500ms
	LONG = 6000 // 6 sec
}

const useChat = () => {
	const [chatHistory, setChatHistory] = useState<BubbleType[]>([])
	const [draftBubble, setDraftBubble] = useState<string>('')

	const [showDraftBubble, setShowDraftBubble] = useState(false)

	const [isBubbleVisible, setIsBubbleVisible] = useState(true)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			const { code } = event
			const isEnterCode = code === 'Enter'

			setShowDraftBubble(true)

			if (isEnterCode && draftBubble.trim() !== '') {
				setChatHistory((prevChatHistory) => [
					...prevChatHistory,
					{
						id: uuid(),
						content: draftBubble,
						isVisible: true
					}
				])
				setShowDraftBubble(false)
				setDraftBubble('')
			}
		},
		[draftBubble]
	)

	const onDraftBubbleChange = (value: string) => {
		setDraftBubble(value)
	}

	const getTimerDuration = useMemo(() => {
		return chatHistory.length >= 3 ? TimerValues.SHORT : TimerValues.LONG
	}, [chatHistory.length])

	useEffect(() => {
		const timerId = setTimeout(
			() => {
				if (isBubbleVisible) {
					setChatHistory((prevChatHistory) => [...prevChatHistory.slice(1)])
				} else {
					setChatHistory((prevChatHistory) => [
						{ ...prevChatHistory[0], isVisible: false },
						...prevChatHistory.slice(1)
					])
				}
				setIsBubbleVisible(!isBubbleVisible)
			},
			isBubbleVisible ? TimerValues.SHORT : getTimerDuration
		)

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			clearTimeout(timerId)
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [getTimerDuration, handleKeyDown, isBubbleVisible])

	return {
		chatHistory,
		draftBubble,
		showDraftBubble,
		onDraftBubbleChange
	}
}

export { useChat }
