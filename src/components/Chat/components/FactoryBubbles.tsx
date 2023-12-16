import { FC } from 'react'

import { PullUpAnimation } from '../../../animations/bubble'
import { BubbleType } from '../../../types/bubble'
import { Bubble } from './Bubble'

type FactoryBubblesProps = {
  bubbles: BubbleType[]
}

const FactoryBubbles: FC<FactoryBubblesProps> = ({ bubbles }) => {
  return (
    <>
      {bubbles.map((bubbles) => (
        <Bubble key={bubbles.id} data={bubbles} {...PullUpAnimation} />
      ))}
    </>
  )
}

export { FactoryBubbles }
