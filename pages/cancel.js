import React from 'react'

import {Button, Typography, Container } from "@mui/material";
import {Header} from "../components/Header/Header";
import Box from "@mui/material/Box";
import {Footer} from "../components/Footer/Footer";
import { useRouter } from "next/router";

const Cancel = () => {
    const router = useRouter()
    return (
        <>
            <Header />
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '200px auto 200px auto'
            }}>
                <Typography sx={{
                    color: 'white',
                    fontSize: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    Оплата не удалась <br />
                    <span style={{ fontSize: '25px', textAlign: 'center', margin: '0 auto' }} >попробуйте позже</span>
                </Typography>
                <Button sx={{
                    marginTop: '20px'
                }}
                onClick={() => {
                    router.push('/cart')
                }}
                >
                    Вернуться в корзину
                </Button>
            </Container>
            <Footer />
        </>
    )
}

export default Cancel