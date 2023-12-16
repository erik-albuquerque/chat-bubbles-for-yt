import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { FC } from 'react'

import { MessageType } from '../../../types/Message'

type MessageProps = HTMLMotionProps<'div'> & {
  data: Omit<MessageType, 'id'>
}

const Message: FC<MessageProps> = ({
  data: { content = '' },
  ...props
}: MessageProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="relative w-fit max-w-md rounded-3xl bg-white py-2 pl-3 pr-4"
        {...props}
      >
        <div className="absolute bottom-0 left-0 -z-10 h-6 w-6 rounded-sm bg-white" />
        <span className="break-all text-base">{content}</span>
      </motion.div>
    </AnimatePresence>
  )
}

export { Message }
