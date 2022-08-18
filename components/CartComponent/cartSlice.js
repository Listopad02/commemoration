import { StarTwoTone } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalPrice: 0,
        cartLength: 0,
        cartIncDec: {},
        arrRec: [],
        inputAddr: '',
        wholeOrder: []
    },
    reducers: {
        setCartIncrement: (state, action) => {  
            state.cartIncDec[action.payload] = (state.cartIncDec[action.payload] || 0) + 1
            state.wholeOrder.push(action.payload)
        },

        setCartDecrement: (state, action) => {
            state.cartIncDec[action.payload] = state.cartIncDec[action.payload] > 0 ? (state.cartIncDec[action.payload] || 0) - 1 : 0
            // state.wholeOrder.splice(state.wholeOrder.indexOf(action.payload, 1))
            if (state.wholeOrder.indexOf(action.payload) !== -1) {
                state.wholeOrder.splice(state.wholeOrder.indexOf(action.payload), 1)
            }
        },
        pushToCart: (state, action) => {
            state.cartItems.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(n => n.id !== action.payload.payload.id)
            state.totalPrice -= action.payload.payload.price * state.cartIncDec[action.payload.payload.id]
        },
        removeLastElem: (state) => {
            state.cartItems.pop()
        },
        setCartPrice: (state, action) => {
            state.totalPrice += action.payload.payload.price
        }, 
        removeCartItem: (state, action) => {
            state.totalPrice -= action.payload
        },
        setCartLength: (state) => {
            state.cartLength++
        },
        reduceCartLength: (state) => {
            state.cartLength--
        },
        clearCartLength: (state, action) => {
            state.cartLength -= state.cartIncDec[action.payload]
            state.cartIncDec[action.payload] = 0
        },
        clearCart: (state) => {
            state.cartItems = []
            state.cartIncDec = {}
            state.cartLength = 0
            state.totalPrice = 0
        },
        setArrRec: (state, action) => {
            state.arrRec.push(action.payload)
        },
        setInputAddr: (state, action) => {
            state.inputAddr = action.payload
        }

    }
})

const { actions, reducer } = cartSlice

export const { setCartIncrement, setCartDecrement, setCartPrice, removeLastElem,
               pushToCart, removeFromCart, removeCartItem, setCartLength,
               reduceCartLength, clearCartLength, clearCart, setArrRec, setInputAddr } = actions

export default reducer