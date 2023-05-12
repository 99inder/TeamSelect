import { configureStore } from '@reduxjs/toolkit'
import visibleUsers from "./slices/visibleUsersSlice"
import currentPage from "./slices/currentPageSlice"

export const store = configureStore({
  reducer: {
    visibleUsers,
    currentPage
  },
})