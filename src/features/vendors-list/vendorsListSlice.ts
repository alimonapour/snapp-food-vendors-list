import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchData } from "./vendorsListAPI"

interface BadgeType {
  description: string
  image: string
  title: string
  white_image: string
}
interface VendorType {
  id: number
  title: string
  logo: string
  backgroundImage: string
  rate: number | string
  deliveryType: string
  deliveryFee: number | string
  description: string
  badges: BadgeType[]
}

interface DataType {
  type: string
  data: VendorType
}
export interface VendorState {
  vendorsList: DataType[]
  vendorsCount: number
  currentPageSize: number
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null | undefined
}

export const fetchVendorsAsync = createAsyncThunk(
  "vendors/fetchVendors",
  async (currentPageSize: number) => {
    try {
      const response = await fetchData(currentPageSize)
      return response.data
    } catch (error) {
      throw new Error("Error fetching data")
    }
  },
)

const initialState: VendorState = {
  vendorsList: [],
  vendorsCount: 0,
  currentPageSize: 10,
  status: "idle",
  error: null,
}

export const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    setVendorsList: (state, action) => {
      state.vendorsList = action.payload
    },
    setVendorsCount: (state, action) => {
      state.vendorsCount = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorsAsync.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchVendorsAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.vendorsList = action.payload.finalResult
        state.currentPageSize += 10
        state.vendorsCount = action.payload.count
        state.error = null
      })
      .addCase(fetchVendorsAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { setVendorsList, setVendorsCount } = vendorsSlice.actions

export default vendorsSlice.reducer
