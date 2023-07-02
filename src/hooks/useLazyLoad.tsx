import { useState, useEffect, useRef, useCallback } from "react"
import { useScrollEnd } from "./useScrollEnd"

const PAGE_SIZE = 10

interface DataType {
  id: number
  title: string
  logo: string
  backgroundImage: string
  rate: number | string
  deliveryType: string
  deliveryPrice: number | string
  description: string
}
interface VendorType {
  data: DataType
  type: string
}

type Items = VendorType[]

export function useLazyLoad(
  items: Items,
  loaderTriggerElement: HTMLElement | null,
  vendorsCount: number,
) {
  const lastItems = useRef<{} | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentPageSize, setCurrentPageSize] = useState(10)
  const isLastPage = vendorsCount / PAGE_SIZE <= PAGE_SIZE

  const onScrollEnd = useCallback(() => {
    if (!isLastPage) {
      setCurrentPageSize(currentPageSize + 10)
    }
  }, [currentPageSize, isLastPage])

  useEffect(() => {
    if (lastItems.current !== items) {
      setCurrentPage(0)
      lastItems.current = items
    }
  }, [items])

  useScrollEnd(loaderTriggerElement, onScrollEnd)

  return { currentPage, isLastPage, currentPageSize }
}
