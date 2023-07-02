import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
  vendorsList: []
  vendorsCount: number
  status: "idle" | "loading" | "succeeded" | "failed"
}

const initialState: CounterState = {
  vendorsList: [],
  vendorsCount: 0,
  status: "idle",
}

export const vendorsSlice = createSlice({
  name: "vendors-list",
  initialState,
  reducers: {
    setVendorsList: (state, action) => {
      state.vendorsList = action.payload
    },
    setVendorsCount: (state, action) => {
      state.vendorsCount = action.payload
    },
  },
})

export const { setVendorsList, setVendorsCount } = vendorsSlice.actions

export default vendorsSlice.reducer
