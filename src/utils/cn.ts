import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...args: ClassValue[]) => {
	return twMerge(clsx(...args))
}

export { cn }
