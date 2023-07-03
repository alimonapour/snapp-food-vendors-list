import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import vendorsReducer from "../features/vendors-list/vendorsListSlice"

export const store = configureStore({
  reducer: {
    vendors: vendorsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
