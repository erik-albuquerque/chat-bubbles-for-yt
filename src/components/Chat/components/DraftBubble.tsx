import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion'
import { ChangeEvent, useEffect, useRef } from 'react'

import { slideRightAnimation } from '../../../animations/bubble'

type DraftBubbleProps = HTMLMotionProps<'div'> & {
	value: string
	isVisible?: boolean
	onValueChange: (value: string) => void
}

const DraftBubble = ({
	value,
	isVisible = false,
	onValueChange,
	...props
}: DraftBubbleProps) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleDraftBubbleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onValueChange(event.target.value)
	}

	useEffect(() => {
		if (inputRef.current && isVisible) {
			inputRef.current.focus()
		}
	}, [isVisible])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="max-w-md rounded-3xl bg-white py-2 pl-3 pr-4 "
					{...slideRightAnimation}
					{...props}
				>
					<input
						name="draft_bubble"
						type="text"
						className="w-full break-all border-none text-base outline-none"
						value={value}
						ref={inputRef}
						onChange={handleDraftBubbleChange}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export { DraftBubble }
