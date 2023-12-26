import { ReactNode } from 'react'

type ChatProps = {
	children: ReactNode
}

const Chat = ({ children }: ChatProps) => {
	return <div className="flex flex-col gap-2 pb-16 pl-4">{children}</div>
}

export { Chat }
