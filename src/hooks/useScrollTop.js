import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../providers/LenisProvider'

export function useScrollTop() {
  const { pathname } = useLocation()
  const lenisRef = useLenis()

  useEffect(() => {
    if (lenisRef.current) {
      if (pathname.includes('reviews')) return;
      lenisRef.current.scrollTo(0, { immediate: false })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
}