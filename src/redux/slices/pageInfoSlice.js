import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentPage: 1,
    totalPages: 1,
    usersPerPage: 10
};

export const pageInfoSlice = createSlice({
    name: 'pageInfo',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
        }
    },
})

export const { setCurrentPage, setTotalPages } = pageInfoSlice.actions

export default pageInfoSlice.reducer