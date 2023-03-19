import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Hourglass, Menu, Volume2, VolumeX, X } from 'lucide-react'
import { Ghost } from 'models/ghost'
import { FC, Suspense, useRef, useState } from 'react'
import { openLinkInNewTab } from 'utils'
import {
  motion,
  HTMLMotionProps,
  useCycle,
  AnimatePresence,
} from 'framer-motion'
import styles from './index.module.css'
import clsx from 'clsx'
import { projectList } from 'constants/project-list'
import { snsList } from 'constants/sns-list'
import BackgroundMusic from 'assets/sounds/superstar-loop.wav?url'
import useSound from 'use-sound'
import { toggleAnimationVariants } from 'utils/anim'

const VolumeControlBtn = () => {
  const [isMuted, setIsMuted] = useState(true)
  const [play, { pause }] = useSound(BackgroundMusic, {
    loop: true,
    onplay: () => setIsMuted(false),
    onpause: () => setIsMuted(true),
  })

  return (
    <Button
      className={styles['volume-control-btn']}
      onClick={() => {
        isMuted ? play() : pause()
      }}
    >
      {isMuted ? <VolumeX /> : <Volume2 />}
    </Button>
  )
}

const circleToFullScreenVariants = {
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

const ModalForMobile = () => {
  const [modalOpened, toggleModalOpened] = useCycle(false, true)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)
  const toggleBtnCurrent = toggleBtnRef.current

  return (
    <motion.nav
      initial={false}
      animate={modalOpened ? 'open' : 'closed'}
      className={styles['modal']}
    >
      <motion.div
        className={styles['modal-background']}
        custom={{
          width: toggleBtnCurrent?.getBoundingClientRect().width,
          height: toggleBtnCurrent?.getBoundingClientRect().height,
          top: toggleBtnCurrent?.offsetTop,
          left: toggleBtnCurrent?.offsetLeft,
        }}
        variants={circleToFullScreenVariants}
      />
      <AnimatePresence>
        {modalOpened && <ProjectList variant="for-modal" />}
      </AnimatePresence>
      <Button
        ref={toggleBtnRef}
        className={clsx(
          styles['modal-toggle-btn'],
          modalOpened && styles['modal-toggle-btn-opened'],
        )}
        onClick={() => toggleModalOpened()}
      >
        {modalOpened ? <X /> : <Menu />}
      </Button>
    </motion.nav>
  )
}

const wipBadge = (
  <Button className={styles['wip-badge']}>
    <Hourglass width={18} />
    WIP
  </Button>
)

type ProjectListProps = {
  variant?: 'for-modal' | 'for-desktop'
} & HTMLMotionProps<'div'>

const ProjectList: FC<ProjectListProps> = (props) => {
  const { className, variant, ...rest } = props
  return (
    <motion.div
      className={clsx(styles.projects, variant && styles[variant], className)}
      initial={variant === 'for-desktop' ? 'oepn' : 'closed'}
      exit={'closed'}
      variants={toggleAnimationVariants.stagger}
      key="projects"
      {...rest}
    >
      <motion.h2
        className={styles['projects-title']}
        variants={toggleAnimationVariants.fadeFromBottom}
        key="projects-title"
      >
        PROJECTS
      </motion.h2>
      {projectList.map((project) => {
        const { name, bannerUrl, wip, link } = project
        return (
          <Card
            key={name}
            className={clsx(styles['projects-card'], styles[name])}
            badge={wip && wipBadge}
            onClick={() => openLinkInNewTab(link)}
          >
            <img
              className={styles['projects-card-image']}
              draggable={false}
              src={bannerUrl}
              alt={name}
            />
          </Card>
        )
      })}
    </motion.div>
  )
}

const contact = (
  <div className={styles.contact}>
    <h2 className={styles['contact-name']}>Ayane</h2>
    <span className={styles['contact-username']}>@miyakoochi</span>
    <section className={styles['contact-sns']}>
      {snsList.map((sns) => {
        const { name, icon: Icon, link } = sns
        return (
          <Button key={name} onClick={() => openLinkInNewTab(link)}>
            <Icon />
            {name}
          </Button>
        )
      })}
    </section>
  </div>
)

export const Home = () => {
  return (
    <div className={styles.root}>
      <Suspense fallback={null}>
        <Canvas>
          <Ghost scale={6} />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.25}
            scale={10}
            blur={1.5}
            far={0.8}
          />
          <OrbitControls
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>
      </Suspense>
      <VolumeControlBtn />
      <ModalForMobile />
      {contact}
      <ProjectList variant="for-desktop" />
    </div>
  )
}
