import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredData : []
}

export const filteredDataSlice = createSlice({
    name: "filteredData",
    initialState,
    reducers: {
        setFilteredData: (state, action) => {
            state.filteredData = action.payload
        }
    },
})

export const {setFilteredData} = filteredDataSlice.actions

export default filteredDataSlice.reducer