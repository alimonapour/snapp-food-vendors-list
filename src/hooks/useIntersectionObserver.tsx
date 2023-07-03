import { useEffect, useRef } from "react"

type IntersectionHandler = (entries: IntersectionObserverEntry[]) => void
type UseIntersectionObserverProps = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

const useIntersectionObserver = (
  handler: IntersectionHandler,
  {
    root = null,
    rootMargin = "0px",
    threshold = 1.0,
  }: UseIntersectionObserverProps = {},
): React.RefObject<Element> => {
  const observer = useRef<IntersectionObserver | null>(null)
  const ref = useRef<Element>(null)

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(handler, {
      root,
      rootMargin,
      threshold,
    })

    if (ref.current) {
      observer.current.observe(ref.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [handler, root, rootMargin, threshold])

  return ref
}

export default useIntersectionObserver
