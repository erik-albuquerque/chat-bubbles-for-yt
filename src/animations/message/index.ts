import { AnimationProps } from 'framer-motion'

type AnimateProps = AnimationProps['animate']

const LeftSlideAnimation: AnimateProps = {
  opacity: [0, 1],
  x: [-20, 0],
  transition: { duration: 0.3 }
}

export { LeftSlideAnimation }
