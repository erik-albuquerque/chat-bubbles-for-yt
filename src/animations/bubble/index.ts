import { AnimationProps } from 'framer-motion'

type AnimateProps = AnimationProps['animate']

const LeftSlideAnimation: AnimateProps = {
  opacity: [0, 1],
  x: [-20, 0],
  transition: { duration: 0.3 }
}

const PullUpAnimation: AnimationProps = {
  animate: {
    y: [0, -10],
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 50,
      default: {
        duration: 0.4
      }
    }
  },
  exit: { opacity: 0, transition: { duration: 0.5 } }
}

export { LeftSlideAnimation, PullUpAnimation }
