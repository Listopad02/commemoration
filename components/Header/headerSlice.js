import { createSlice } from '@reduxjs/toolkit'

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        counter: 0,
        id: null,
    },
    reducers: {
        setCounter: (state, action) => {
            state.counter = action.payload
        },
        setId: (state, action ) => {
            state.id = action.payload
        }
    },
    extraReducers: {},
})

const { actions, reducer } = headerSlice

export const { setCounter, setId } = actions
export default reducer
