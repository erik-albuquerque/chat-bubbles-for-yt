import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { FC } from 'react'

import { BubbleType } from '../../../types/bubble'

type BubbleProps = HTMLMotionProps<'div'> & {
  data: Omit<BubbleType, 'id'>
}

const Bubble: FC<BubbleProps> = ({
  data: { content = '', isVisible = true },
  ...props
}: BubbleProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="relative w-fit max-w-md rounded-3xl bg-white py-2 pl-3 pr-4"
          {...props}
        >
          <div className="absolute bottom-0 left-0 -z-10 h-6 w-6 rounded-sm bg-white" />
          <span className="break-all text-base">{content}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Bubble }
