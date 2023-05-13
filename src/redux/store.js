import { configureStore } from '@reduxjs/toolkit'
import visibleUsers from "./slices/visibleUsersSlice"
import pageInfo from "./slices/pageInfoSlice"
import team from "./slices/teamSlice"
import filteredData from './slices/filteredDataSlice'

export const store = configureStore({
  reducer: {
    visibleUsers,
    pageInfo,
    team,
    filteredData
  },
})