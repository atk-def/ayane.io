import type { FC, HTMLAttributes } from 'react'

export interface PictureProps extends HTMLAttributes<HTMLPictureElement> {
  jpgSrc?: string
  pngSrc?: string
  webpSrc?: string
  imgAttrs?: HTMLAttributes<HTMLImageElement>
}

export const Picture: FC<PictureProps> = ({
  jpgSrc,
  pngSrc,
  webpSrc,
  imgAttrs,
  ...rest
}) => {
  if (!pngSrc && !jpgSrc) {
    return null
  }
  return (
    <picture {...rest}>
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      {pngSrc && <source srcSet={pngSrc} type="image/png" />}
      {jpgSrc && <source srcSet={jpgSrc} type="image/jpeg" />}
      <img src={pngSrc ?? jpgSrc} {...imgAttrs} />
    </picture>
  )
}
