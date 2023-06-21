import { useEffect } from 'react'

export const useTitleSetter = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}
