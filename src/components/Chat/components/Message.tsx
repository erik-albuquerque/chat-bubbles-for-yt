import { FC } from 'react'

import { MessageType } from '../../../types/Message'

type MessageProps = {
  data: Omit<MessageType, 'id'>
}

const Message: FC<MessageProps> = ({
  data: { content = '' }
}: MessageProps) => {
  return (
    <div className="relative w-fit max-w-md rounded-3xl bg-white py-2 pl-3 pr-4">
      <div className="absolute bottom-0 left-0 -z-10 h-6 w-6 rounded-sm bg-white" />
      <span className="break-all text-base">{content}</span>
    </div>
  )
}

export { Message }
