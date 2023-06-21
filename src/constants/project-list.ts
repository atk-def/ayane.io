import riffBannerPngUrl from 'assets/images/riff.png?url'
import pikuseruBannerPngUrl from 'assets/images/pikuseru.png?url'
import pikushiBannerPngUrl from 'assets/images/pikushi.png?url'
import riffBannerWebpUrl from 'assets/images/riff.webp?url'
import pikuseruBannerWebpUrl from 'assets/images/pikuseru.webp?url'
import pikushiBannerWebpUrl from 'assets/images/pikushi.webp?url'
import {
  PIKUSERU_PROJECT_URL,
  PIKUSHI_PROJECT_URL,
  RIFF_PROJECT_URL,
} from './external-link'

export interface Project {
  name: string
  banner: {
    png: string
    webp: string
  }
  wip: boolean
  link: string
}

export const projectList: Project[] = [
  {
    name: 'riff',
    banner: {
      png: riffBannerPngUrl,
      webp: riffBannerWebpUrl,
    },
    wip: true,
    link: RIFF_PROJECT_URL,
  },
  {
    name: 'pikuseru',
    banner: {
      png: pikuseruBannerPngUrl,
      webp: pikuseruBannerWebpUrl,
    },
    wip: true,
    link: PIKUSERU_PROJECT_URL,
  },
  {
    name: 'pikushi',
    banner: {
      png: pikushiBannerPngUrl,
      webp: pikushiBannerWebpUrl,
    },
    wip: false,
    link: PIKUSHI_PROJECT_URL,
  },
]
