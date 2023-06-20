import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Hourglass, Menu, Volume2, VolumeX, X } from 'lucide-react'
import { Ghost } from 'models/ghost'
import { FC, Suspense, useEffect, useRef, useState } from 'react'
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
import { menuAnimationVariants, toggleAnimationVariants } from 'utils/anim'

const Audio = () => {
  const [play, { stop }] = useSound(BackgroundMusic, {
    loop: true,
  })

  useEffect(() => {
    play()
    return () => stop()
  })

  return null
}

const AudioControlBtn = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Button
      className={styles['audio-control-btn']}
      onClick={() => setIsPlaying((prev) => !prev)}
    >
      {!isPlaying ? <VolumeX /> : <Volume2 />}
      <Suspense>{isPlaying && <Audio />}</Suspense>
    </Button>
  )
}

const ModalForMobile = () => {
  const [modalOpen, toggleModalOpen] = useCycle(false, true)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)
  const toggleBtnCurrent = toggleBtnRef.current

  return (
    <motion.nav
      initial={false}
      animate={modalOpen ? 'open' : 'closed'}
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
        variants={menuAnimationVariants}
      />
      <AnimatePresence>
        {modalOpen && <ProjectList variant="for-modal" />}
      </AnimatePresence>
      <Button
        ref={toggleBtnRef}
        className={clsx(
          styles['modal-toggle-btn'],
          modalOpen && styles['modal-toggle-btn-opened'],
        )}
        onClick={() => toggleModalOpen()}
      >
        {modalOpen ? <X /> : <Menu />}
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
        <AudioControlBtn />
      </Suspense>
      <ModalForMobile />
      {contact}
      <ProjectList variant="for-desktop" />
    </div>
  )
}
