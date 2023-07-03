import { useEffect, useRef } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { VendorCard } from "../../components/ui/VendorCard"
import { makeNumbersFarsi } from "../../utils/makeNumbersFarsi"
import styles from "./VendorsList.module.scss"
import { fetchVendorsAsync } from "./vendorsListSlice"
import ScrollButton from "../../components/ui/ScrollToTopButton"
import { VendorCardSkeleton } from "../../components/ui/VendorCardSkelton"
import { ErrorPage } from "../../components/ui/ErrorPage"

export const VendorsList: React.FC = () => {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const { vendorsList, status, error, currentPageSize } = useAppSelector(
    (state) => state.vendors,
  )

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    const target = entries[0]
    if (target.isIntersecting && !(status === "loading")) {
      dispatch(fetchVendorsAsync(currentPageSize + 10))
    }
  }

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }

    observer.current = new IntersectionObserver(handleIntersection, options)
    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [dispatch, currentPageSize, status])

  useEffect(() => {
    dispatch(fetchVendorsAsync(10))
  }, [dispatch])

  const vendorsListItems = vendorsList.filter(
    (vendor) => vendor["type"] === "VENDOR",
  )

  const openVendorsCount = vendorsList.filter(
    (vendor) => vendor["type"] === "TEXT",
  )

  return (
    <div className={styles.vendorsListContainer}>
      {status === "failed" && <ErrorPage />}
      {openVendorsCount && (
        <h1 className={styles.openVendorsCount}>
          {makeNumbersFarsi(openVendorsCount[0]?.data as any)}
        </h1>
      )}

      {vendorsListItems &&
        vendorsListItems.map((vendor, index) => {
          if (index === vendorsListItems.length - 1) {
            return (
              <div key={vendor.data.id} ref={lastItemRef}>
                <VendorCard
                  key={vendor.data.id}
                  restaurantTitle={vendor.data.title}
                  logoUrl={vendor.data.logo}
                  coverPhotoUrl={vendor.data.backgroundImage}
                  vendorRate={vendor.data.rate}
                  deliveryType={
                    vendor.data.badges.length > 0
                      ? "ارسال اکسپرس"
                      : "پیک فروشنده"
                  }
                  deliveryPrice={vendor.data.deliveryFee}
                  description={vendor.data.description}
                />
              </div>
            )
          }
          return (
            <div key={vendor.data.id}>
              <VendorCard
                key={vendor.data.id}
                restaurantTitle={vendor.data.title}
                logoUrl={vendor.data.logo}
                coverPhotoUrl={vendor.data.backgroundImage}
                vendorRate={vendor.data.rate}
                deliveryType={
                  vendor.data.badges.length > 0 ? "ارسال اکسپرس" : "پیک فروشنده"
                }
                deliveryPrice={vendor.data.deliveryFee}
                description={vendor.data.description}
              />
            </div>
          )
        })}

      {status === "loading" && <VendorCardSkeleton />}
      <ScrollButton />
    </div>
  )
}
