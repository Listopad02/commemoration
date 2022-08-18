import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import styles from './recommendation.module.css'
import { FreeMode, Pagination, Navigation } from "swiper";
import { useAppSelector, useAppDispatch } from '../../redux/hooks.ts'
import {
    pushToCart,
    reduceCartLength,
    removeCartItem,
    removeFromCart, removeLastElem,
    setArrRec,
    setCartDecrement,
    setCartIncrement, setCartLength, setCartPrice
} from "./cartSlice";
import Image from 'next/image'

const Recommendation = () => {

    const dishes = useAppSelector(state => state.dishes.dish)
    const [reload, setReload] = useState(0)
    const arrRec = useAppSelector(state => state.cart.arrRec)
    const incDec = useAppSelector(state => state.cart.cartIncDec)
    const cartItems = useAppSelector((state) => state.cart.cartItems);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dishes.map((el, i) => {
            if(el.category.name === 'Посуда') {
                dispatch(setArrRec(el))
            }
        })
    }, [dishes, dispatch])

    const showCartLength = (el) => {
        return incDec[el]
    }

    return (
        <>
            <Box className={styles.recom}>
                <h3 className={styles.title}>
                    Рекомендуем
                </h3>
                <Box className={styles.box}>
                    <Swiper
                        slidesPerView={
                            window.screen.width < 500 ? 1 : window.screen.width <= 1200 ? 2 : 3
                        }
                        spaceBetween={30}
                        freeMode={true}
                        navigation={true}
                        modules={[FreeMode, Navigation]}
                        className={styles.mySwiper}
                    >
                        {arrRec.map((el, i) => {
                            return (
                                <SwiperSlide className={styles.slide} key={i}>
                                    <Image
                                        loader={() => 'https://api.pominkizal.ru' + el.image}
                                        src={'https://api.pominkizal.ru' + el.image}
                                        alt='photo'
                                        width={150}
                                        height={150}
                                        className={styles.img}
                                    />
                                    <p className={styles.text}>{el.name}</p> 
                                    <div
                                        className={styles.div}
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <div>
                                            <p className={styles.weight}>{el.weight}г</p>
                                            <p className={styles.price}>{el.price}P</p>
                                        </div>
                                        <div className="btn-container">
                                            <button
                                                className={incDec[el.id] > 0 ? styles.btn : styles.none}
                                                onClick={() => {
                                                    setReload(reload + 1)
                                                    dispatch(setCartDecrement(el.id))
                                                    dispatch(removeCartItem(el.price))
                                                    dispatch(reduceCartLength())
                                                    if (incDec[el.id] === 0 ) {
                                                        dispatch(removeFromCart({ payload: {id: el.id, price: el.price} }))
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                            <button
                                                className={styles.btn}
                                                onClick={() => {
                                                    setReload(reload + 1)
                                                    if (!cartItems.includes(el)) {
                                                        dispatch(pushToCart(el));
                                                        dispatch(setCartIncrement(el.id));
                                                    } else {
                                                        dispatch(setCartIncrement(el.id));
                                                    }
                                                    cartItems.forEach((item) => {
                                                        if (item.id === el.id && !cartItems.includes(el)) {
                                                            dispatch(removeLastElem());
                                                        }
                                                    });
                                                    dispatch(setCartPrice( {payload: {id: el.id, price: el.price, name: el.name}} ))
                                                    dispatch(setCartLength())
                                                }}
                                            >
                                                {
                                                    showCartLength(el.id) > 0 ? incDec[el.id] : "+"
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </Box>
            </Box>
        </>
    )
}

export default Recommendation