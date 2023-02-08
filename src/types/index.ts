import type { HTMLAttributes } from 'vue'

export type ImgProps = {
  src: string
  alt?: string
  blank?: boolean
  class?: HTMLAttributes['class'],
  blankColor?: string
  center?: boolean
  block?: boolean
  fluid?: boolean
  fluidGrow?: boolean
  rounded?: string | boolean
  sizes?: string
  lazy?: boolean
  thumbnail?: boolean
  height?: string | number
  width?: string | number
  start?: boolean
  end?: boolean
}
