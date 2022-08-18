import React from 'react'
import {Header} from "../components/Header/Header";
import Maps from "../components/yaMaps/yaMaps";
import { Footer } from "../components/Footer/Footer";
import Box from "@mui/material/Box";

const Delivery = () => {
    return (
        <>
        <Header />
        <Maps />
        <Box sx={{ margin: { md: 0, xs: '800px 0 0 0' } }}>
            <Footer />
        </Box>
        </>
    )
}

export default Delivery