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
  useInView,
} from 'framer-motion'
import styles from './index.module.css'
import clsx from 'clsx'
import { projectList } from 'constants/project-list'
import { snsList } from 'constants/sns-list'
import BackgroundMusic from 'assets/sounds/superstar-loop.wav?url'
import useSound from 'use-sound'
import { toggleAnimationVariants } from 'utils/anim'
import { Picture } from 'components/picture'
import { Spinner } from 'components/spinner'

const Audio: FC<{ onPending?: () => void; onFinish?: () => void }> = ({
  onPending,
  onFinish,
}) => {
  const [isPending, setIsPending] = useState(true)
  const [play, { stop }] = useSound(BackgroundMusic, {
    loop: true,
    interrupt: false,
    onload: () => setIsPending(false),
  })

  useEffect(() => {
    play()
    return () => stop()
  }, [play])

  useEffect(() => {
    isPending ? onPending?.() : onFinish?.()
  }, [isPending])

  if (isPending) {
    return (
      <div className={styles['audio-indicator']}>
        <Spinner />
      </div>
    )
  }

  return null
}

const AudioControlBtn: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <Button
      className={clsx(
        styles['audio-control-btn'],
        isPlaying && !disabled && styles['ping-anim'],
      )}
      onClick={() => setIsPlaying((prev) => !prev)}
      disabled={disabled}
    >
      {!isPlaying ? <VolumeX /> : <Volume2 />}
      {isPlaying && (
        <Audio
          onPending={() => setDisabled(true)}
          onFinish={() => setDisabled(false)}
        />
      )}
    </Button>
  )
}

const ProjectListModalForMobile: FC = () => {
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
        variants={toggleAnimationVariants.fullScreen}
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
      initial={variant === 'for-desktop' ? 'open' : 'closed'}
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
            <Picture
              webpSrc={bannerUrl.webp}
              pngSrc={bannerUrl.png}
              imgAttrs={{
                className: styles['projects-card-image'],
                draggable: false,
              }}
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
  const largeScreenDividerRef = useRef<HTMLDivElement>(null)
  const isLargeScreen = useInView(largeScreenDividerRef)

  return (
    <div className={styles.root}>
      <Suspense
        fallback={
          <div className={styles['root-indicator']}>
            <Spinner />
          </div>
        }
      >
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
      {contact}
      {isLargeScreen ? (
        <ProjectList variant="for-desktop" />
      ) : (
        <ProjectListModalForMobile />
      )}
      <AudioControlBtn />
      <div ref={largeScreenDividerRef} className="fixed left-[1280px]" />
    </div>
  )
}
