import React, { useState, useEffect } from 'react';
import { Container, Drawer } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import iconsHeader from '../../public/icons/logoHeader.svg'
import cart from '../../public/icons/cart.svg'
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { setCounter } from './headerSlice'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../Footer/style.module.css'
import Image from 'next/image'

import { useRouter } from 'next/router'
import stylese from './style.module.css'

const style = {
    logoTitle: {
        color: 'white'
    },
    container: {
        justifyContent: 'space-around',
        margin: '0 auto 0 auto',
        position: 'fixed',
        paddingTop: '25px',
        paddingBottom: '25px',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        // background: '#0F131A',
        zIndex: 1000,
        width: '100%',
    },
    box: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    btnActive: {
        color: 'white',
        // background: 'white',
        borderRadius: '30px',
        width: '105px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '36px',
        marginRight: '20px',
        fontSize: '20px',
        filter: 'drop-shadow(0px 0px 15px rgb(25, 226, 255)) drop-shadow(0px 0px 15px rgb(25, 226, 255))'
    },
    btn: {
        color: 'white',
        border: 'none',
        outline: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '36px',
        marginRight: '20px',
        width: '105px',
        fontSize: '20px'
    },
    btnMenu: {
        color: 'white',
        border: 'none',
        outline: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '36px',
        width: '200px',
        textAlign: 'center',
        fontSize: '20px'
    },
    btnMenuActive : {
        color: 'white',
        border: 'none',
        outline: 'none',
        // background: 'white',
        borderRadius: '30px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '36px',
        width: '200px',
        textAlign: 'center',
        fontSize: '20px',
        filter: 'drop-shadow(0px 0px 15px rgb(25, 226, 255)) drop-shadow(0px 0px 15px rgb(25, 226, 255))'
    },
    btnDilivActive: {
        color: 'white',
        // background: 'white',
        borderRadius: '30px',
        width: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '36px',
        marginRight: '20px',
        fontSize: '20px',
        filter: 'drop-shadow(0px 0px 15px rgb(25, 226, 255)) drop-shadow(0px 0px 15px rgb(25, 226, 255))'
    },
    btnDiliv: {
        color: 'white',
        border: 'none',
        outline: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '36px',
        marginRight: '20px',
        width: '200px',
        fontSize: '20px'
    },
    count: {
        backgroundColor: 'white',
        borderRadius: '50%',
        width: '22px',
        height: '22px',
        color: 'black',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '115.4%',
        letterSpacing: '-0.05em',
        position: 'absolute',
        top: '-7px',
        right: '-5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
}
}

export const Header = () => {
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch();
    const [menu, setMenu] = useState(false)
    const counter = useAppSelector(state => state.cart.cartLength)
    const router = useRouter()
    const handleMenu = () => {
        setMenu(!menu)
    }

    const cartItems = useAppSelector(state => state.cart.cartItems)

    useEffect(() => {
        const nav = document.getElementById('header');
        window.addEventListener("scroll", function (e) {
            if (window.pageYOffset > 0 && nav !== null) {
                nav.style.cssText =
                    "background: rgb(15, 19, 26, 0.5); margin: 0 auto; display: flex; justify-content: space-around; position: fixed; width: 100%;" +
                    "top: 0; left: 0; padding-top: 25px; padding-bottom: 25px; z-index: 99999; backdrop-filter: blur(10px);" +
                    "border-bottom: 1px solid #0F131A;"
            } else if (nav !== null) {
                nav.style.cssText =
                    "background: none; margin: 0 auto; display: flex; justify-content: space-around; position: fixed; width: 100%;" +
                    "top: 0; left: 0; padding-top: 25px; padding-bottom: 25px;"
            }
        });
    }, [])

    useEffect(() => {
        dispatch(setCounter(cartItems.length))
    })

    return (
        <Container style={{ position: 'relative' }} >
            <Box style={style.container} id='header'>
                <Link href='/' style={{ cursor: 'pointer' }}>
                    <div style={{ cursor: 'pointer', margin: '0' }} className={`${styles.logo} ${styles.hover}`} />
                </Link>
                <IconButton onClick={() => handleMenu()} sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <MenuIcon style={{ color: "white" }}/>
                </IconButton>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    <Link style={style.btnActive} href='/'>
                        <a className={styles.hover} style={router.asPath === '/' ? style.btnActive : style.btn}>Главная</a>
                    </Link>
                    <Link style={style.btnActiveDel} href='/delivery'>
                        <a className={styles.hover} style={router.asPath === '/delivery' ? style.btnDilivActive : style.btnDiliv}>Оплата и доставка</a>
                    </Link>
                    <Link style={style.btn } href='/contacts' >
                        <a className={styles.hover} style={router.asPath === '/contacts' ? style.btnActive : style.btn}>Контакты</a>
                    </Link>
                    <Link href='/cart' style={{ color: '#fff', cursor: 'pointer' }} >
                        <div  className={styles.hover} style={{ position: 'relative', cursor: 'pointer',  }}>
                            <div style={style.count}>{counter}</div>
                            <Image
                                 loader={() => cart.src}
                                 alt='photo'
                                 width={32}
                                 height={28}
                                 src={cart.src} />
                        </div>
                    </Link>
                </Box>
            </Box>
            {menu &&
                <Box sx={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    backgroundColor: 'rgba(0,0,0, 0.7)',
                    width: '100%',
                    height: '100%',
                    zIndex: '9999999999999999999',

                }}
                >
                    <Box sx={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        background: 'linear-gradient(183.65deg, #0F131A 19.64%, #797777 80.16%) fixed center',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 9999,
                    }}>
                        <IconButton onClick={() => handleMenu()} sx={{ position: 'absolute', top: '15px', right: '15px' }}>
                            <CloseIcon style={{ color: 'white' }} />
                        </IconButton>
                        <div style={{ marginTop: '70px' }}/>
                        <Link style={style.btnMenu } href='/menu' >
                            <a style={router.asPath === '/menu' ? style.btnMenuActive : style.btnMenu}>Наше меню</a>
                        </Link>
                        <Link style={style.btnMenu} href='/nabor' >
                            <a style={router.asPath === '/nabor' ? style.btnMenuActive : style.btnMenu}>Готовые наборы</a>
                        </Link>
                        <Link style={style.btnActive} href='/'>
                            <a style={router.asPath === '/' ? style.btnMenuActive : style.btnMenu}>Главная</a>
                        </Link>
                        <Link style={style.btnMenu} href='/delivery'>
                            <a style={router.asPath === '/delivery' ? style.btnMenuActive : style.btnMenu}>Оплата и доставка</a>
                        </Link>
                        <Link style={style.btnMenu } href='/contacts' >
                            <a style={router.asPath === '/contacts' ? style.btnMenuActive : style.btnMenu}>Контакты</a>
                        </Link>

                        <Link href='/cart' style={style.btnMenu} >
                            <a style={router.asPath === '/cart' ? style.btnMenuActive : style.btnMenu}>Корзина</a>
                        </Link>
                        <div style={{ marginTop: '30px' }} />
                        <Link href='/' style={{ cursor: 'pointer' }}>
                            <div style={{ cursor: 'pointer' }} className={styles.logo} />
                        </Link>
                    </Box>
                </Box>
            }
        </Container>
    )
}