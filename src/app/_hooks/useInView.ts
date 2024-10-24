'use client'

import { useState, useEffect, useRef, type RefObject } from 'react'

interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useInView<T extends Element>(
  options: IntersectionOptions = {}
): [RefObject<T>, boolean] {
  const { threshold = 0, root = null, rootMargin = '0px', freezeOnceVisible = false } = options

  const [isInView, setIsInView] = useState<boolean>(false)
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsInView(isVisible)

        if (isVisible && freezeOnceVisible) {
          observer.unobserve(element)
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, root, rootMargin, freezeOnceVisible])

  return [elementRef, isInView]
}