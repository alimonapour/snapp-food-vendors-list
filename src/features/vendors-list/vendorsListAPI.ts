import axios from "axios"

const apiUrl = "https://snappfood.ir/mobile/v3/restaurant/vendors-list"

export const fetchData = async (currentPageSize: number) => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        page: 0,
        page_size: currentPageSize,
        lat: 35.754,
        long: 51.328,
      },
    })
    return response.data
  } catch (error) {
    throw new Error("Error fetching data")
  }
}
