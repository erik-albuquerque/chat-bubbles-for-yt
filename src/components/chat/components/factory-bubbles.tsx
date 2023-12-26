import { FC } from 'react'

import { slideUpAnimation } from '../../../animations/bubble'
import { BubbleType } from '../../../types/bubble'
import { Bubble } from './bubble'

type FactoryBubblesProps = {
	bubbles: BubbleType[]
}

const FactoryBubbles: FC<FactoryBubblesProps> = ({
	bubbles
}: FactoryBubblesProps) => {
	return (
		<>
			{bubbles.length > 0 &&
				bubbles.map((bubbles) => (
					<Bubble key={bubbles.id} data={bubbles} {...slideUpAnimation} />
				))}
		</>
	)
}

export { FactoryBubbles }
