import riffBannerUrl from 'assets/images/riff.png?url'
import pikuseruBannerUrl from 'assets/images/pikuseru.png?url'
import pikushiBannerUrl from 'assets/images/pikushi.png?url'
import {
  PIKUSERU_PROJECT_URL,
  PIKUSHI_PROJECT_URL,
  RIFF_PROJECT_URL,
} from './external-link'

export const projectList = [
  {
    name: 'riff',
    bannerUrl: riffBannerUrl,
    wip: true,
    link: RIFF_PROJECT_URL,
  },
  {
    name: 'pikuseru',
    bannerUrl: pikuseruBannerUrl,
    wip: true,
    link: PIKUSERU_PROJECT_URL,
  },
  // {
  //   name: 'coma',
  //   bannerUrl: comaBannerUrl,
  //   wip: true,
  //   link: COMA_PROJECT_URL,
  // },
  {
    name: 'pikushi',
    bannerUrl: pikushiBannerUrl,
    wip: false,
    link: PIKUSHI_PROJECT_URL,
  },
]
