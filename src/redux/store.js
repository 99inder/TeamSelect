import { configureStore } from '@reduxjs/toolkit'
import visibleUsers from "./slices/visibleUsersSlice"
import pageInfo from "./slices/pageInfoSlice"

export const store = configureStore({
  reducer: {
    visibleUsers,
    pageInfo
  },
})