import { useEffect, useRef } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { VendorCard } from "../../components/ui/VendorCard"
import { makeNumbersFarsi } from "../../utils/makeNumbersFarsi"
import styles from "./VendorsList.module.scss"
import { fetchVendorsAsync } from "./vendorsListSlice"

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
      {status === "loading" && <h1>loading......</h1>}
      {status === "failed" && <h1>{error}</h1>}
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
                  vendorRate={makeNumbersFarsi(vendor.data.rate)}
                  deliveryType="اکسپرس"
                  deliveryPrice={makeNumbersFarsi("20000")}
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
                vendorRate={makeNumbersFarsi(vendor.data.rate)}
                deliveryType="اکسپرس"
                deliveryPrice={makeNumbersFarsi("20000")}
                description={vendor.data.description}
              />
            </div>
          )
        })}
    </div>
  )
}
