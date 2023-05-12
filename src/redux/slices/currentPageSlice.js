import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 1
};

export const currentPageSlice = createSlice({
    name: 'currentPageSlice',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setCurrentPage } = currentPageSlice.actions

export default currentPageSlice.reducer