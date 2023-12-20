import { AnimationProps } from 'framer-motion'

const slideRightAnimation: AnimationProps = {
  animate: {
    opacity: [0, 1],
    x: [-20, 0],
    transition: { duration: 0.3 }
  }
}

const slideUpAnimation: AnimationProps = {
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

export { slideRightAnimation, slideUpAnimation }
