import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
};

export const visibleUsersSlice = createSlice({
    name: 'visibleUsers',
    initialState,
    reducers: {
        setVisibleUsers: (state, action) => {
            state.value = action.payload
            console.log(state.value)
        },
    },
})

export const { setVisibleUsers } = visibleUsersSlice.actions

export default visibleUsersSlice.reducer