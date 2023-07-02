import axios from "axios"
import { setVendorsList, setVendorsCount } from "./vendorsListSlice"

export const fetchAllVendors =
  (currentPage: number, currentPageSize: number) => (dispatch: any) => {
    console.log("current page and current size", currentPage, currentPageSize)
    axios
      .get("https://snappfood.ir/mobile/v3/restaurant/vendors-list", {
        params: {
          page: currentPage,
          page_size: currentPageSize,
          lat: 35.754,
          long: 51.328,
        },
      })
      .then((response) => {
        dispatch(setVendorsList(response.data.data.finalResult))
        dispatch(setVendorsCount(response.data.data.count))
      })
      .catch((error) => console.log(error))
  }
