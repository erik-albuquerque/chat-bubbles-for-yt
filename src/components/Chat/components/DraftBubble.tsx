import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion'
import { FormEvent, useCallback, useEffect, useRef } from 'react'

import { slideRightAnimation } from '../../../animations/bubble'

type DraftBubbleProps = HTMLMotionProps<'div'> & {
	isVisible?: boolean
	onValueChange: (value: string) => void
}

const DraftBubble = ({
	isVisible = false,
	onValueChange,
	...props
}: DraftBubbleProps) => {
	const refEditable = useRef<HTMLDivElement>(null)

	const handleDraftBubbleChange = (event: FormEvent<HTMLDivElement>) => {
		onValueChange(event.currentTarget.innerText)
	}

	const handleBlur = useCallback(() => {
		const { current: currentRefEditable } = refEditable

		if (currentRefEditable && isVisible) {
			currentRefEditable.focus()
		}
	}, [refEditable, isVisible])

	useEffect(handleBlur, [handleBlur])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="w-fit rounded-3xl bg-white py-2 pl-3 pr-4 "
					{...slideRightAnimation}
					{...props}
				>
					<div
						contentEditable
						className="max-w-md overflow-y-hidden break-words text-base outline-none"
						ref={refEditable}
						onInput={handleDraftBubbleChange}
						onBlur={handleBlur}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export { DraftBubble }
