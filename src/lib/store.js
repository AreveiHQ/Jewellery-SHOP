import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from "@/lib/reducers/categoryReducer"
export const makeStore = () => {
  return configureStore({
    reducer: {
        categories:categoryReducer
    },
  })
}