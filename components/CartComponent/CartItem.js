import React from 'react'
import Box from "@mui/material/Box";
import styles from './style.module.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { setCartIncrement, 
         setCartDecrement, 
         removeFromCart,
         setCartPrice,
         removeCartItem,
         setCartLength,
         reduceCartLength,
         clearCartLength } from './cartSlice'
import Image from 'next/image'

const CartItem = ({ id, src, name, title, price }) => {
    const dispatch = useAppDispatch()
    const counter = useAppSelector(state => state.cart.cartIncDec[id] || 1 )

    return (
        <Box className={styles.box} id={id}>
            <Image
                width={80}
                height={80}
                loader={() => "https://api.pominkizal.ru" + src}
                src={"https://api.pominkizal.ru" + src}
                className={styles.image}
                alt='photo'/>
            <h4 className={styles.title}>{name ? name : title}</h4>
            <Box className={styles.box__counter}>
                <button className={styles.btn__inc}
                onClick={counter > 1 ? () => {
                    dispatch(setCartDecrement(id))
                    dispatch(removeCartItem(price))
                    dispatch(reduceCartLength())
                } : null}>-</button>
                {counter}
                <button className={styles.btn__inc} 
                onClick={() => {
                    dispatch(setCartIncrement(id))
                    dispatch(setCartPrice({ payload: {id, price, name} }))
                    dispatch(setCartLength())
                }}>+</button>
            </Box>
            <h4 className={styles.btn__price}>{counter * price} р</h4>
            <IconButton style={{
                width: '20px',
                height: '20px',
                border: '2px solid #fff',
                color: '#fff',
                borderRadius: '50%',
                padding: '5px',
            }}
                onClick={() => {
                    dispatch(removeFromCart({ payload: {id, price} }))
                    dispatch(clearCartLength(id))
                }}
            >
                <CloseIcon sx={{
                    width: '10px',
                    height: '10px',
                    color: '#fff',
                }}
                />
            </IconButton>
        </Box>
    )
}

export default CartItem