export const toggleAnimationVariants = {
  stagger: {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  },
  fadeFromBottom: {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  },
}

export const menuAnimationVariants = {
  open: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 1,
    borderRadius: 0,
    transition: {
      type: 'spring',
      restDelta: 2,
      duration: 0.5,
    },
  },
  closed: ({
    width,
    height,
    top,
    left,
  }: {
    width: number
    height: number
    top: number
    left: number
  }) => ({
    width,
    height,
    top,
    left,
    opacity: 0,
    borderRadius: 100,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      delay: 0.5,
    },
  }),
}
