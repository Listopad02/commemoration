import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../components/CartComponent/cartSlice';
import headerSlice from '../components/Header/headerSlice'
import dishesSlice from '../components/MenuComponent/redux/dishesSlice'

export const store = configureStore({
    reducer: {
        header: headerSlice,
        dishes: dishesSlice,
        cart: cartSlice
    },

    devTools: process.env.MODE !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
