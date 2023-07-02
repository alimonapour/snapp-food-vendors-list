import { useEffect, useRef, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { VendorCard } from "../../components/ui/VendorCard"
import { makeNumbersFarsi } from "../../utils/makeNumbersFarsi"
import styles from "./VendorsList.module.scss"
import { useLazyLoad } from "../../hooks/useLazyLoad"
import { fetchAllVendors } from "./vendorsListAPI"

export const VendorsList = () => {
  const loaderTriggerRef = useRef(null)
  const dispatch = useAppDispatch()
  const { vendorsList, vendorsCount } = useAppSelector((state) => state.vendors)
  const [vendors, setVendors] = useState<any[]>([])

  const { isLastPage, currentPage, currentPageSize } = useLazyLoad(
    vendors,
    loaderTriggerRef.current,
    vendorsCount,
  )

  useEffect(() => {
    dispatch(fetchAllVendors(currentPage, currentPageSize))
    setVendors(vendorsList)
  }, [vendorsList, currentPageSize, currentPage])

  const vendorsListItems = vendors.filter((vendor) => vendor.type === "VENDOR")
  const openVendorsCount = vendors.filter((vendor) => vendor.type === "TEXT")

  return (
    <div className={styles.vendorsListContainer}>
      {openVendorsCount && (
        <h1 className={styles.openVendorsCount}>
          {makeNumbersFarsi(openVendorsCount[0]?.data)}
        </h1>
      )}

      {vendorsListItems &&
        vendorsListItems.map((vendor) => (
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
        ))}
      <div
        ref={loaderTriggerRef}
        style={{ height: "100px" }}
        hidden={isLastPage}
      ></div>
    </div>
  )
}
