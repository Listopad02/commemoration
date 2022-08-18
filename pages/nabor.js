import React from 'react'
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { NaborMenuComponent } from "../components/NaborMenuComponent/NaborMenuComponent";

const nabor = () => {
    return (
        <>
            <Header />
            <NaborMenuComponent />
            <Footer />
        </>
    )
}

export default nabor