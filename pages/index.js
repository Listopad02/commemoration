import React, { useState } from 'react'
import Container from "@mui/material/Container";
import { Header } from "../components/Header/Header";
import { StartScreen } from "../components/StartScreen/StartScreen";
import About from "../components/About/About";
import { Contacts } from "../components/Contacts/Contacts";
import {Footer} from "../components/Footer/Footer";
import Box from "@mui/material/Box";
export default function Home() {
  return (
      <>
        <Header />
        <StartScreen />
        <About />
        <Contacts />
        <Box sx={{ marginTop: { md: '-80px', xs: '500px' } }}>
            <Footer />
        </Box>
      </>
  )
}
