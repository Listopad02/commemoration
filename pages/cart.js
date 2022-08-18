import React, { useState } from "react";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import CartComponent from "../components/CartComponent/CartComponent";


const Cart = () => {
    return (
       <>
           <Header />
           <CartComponent />
           <Footer />
       </>
    )
}

export default Cart