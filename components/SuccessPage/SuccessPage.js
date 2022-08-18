import React from 'react'
import { Container, Typography, Box } from "@mui/material";
import styles from "./style.module.css"
import Link from "next/link";

const SuccessPage = () => {
  return (
    <Container maxWidth="md" className={styles.container} sx={{ backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", borderRadius: "15px", marginTop: "115px" }}>
        <Box sx={{ height: "200px", display: "flex", alignItems: "center" }}>
            <Box>
                <Typography>Оплата прошла успешно!</Typography>
                <Link href="/">
                    <Typography sx={{ color: "#635c5c", fontSize: "13px", textDecoration: "underline", cursor: "pointer" }}>На главную</Typography>
                </Link>
            </Box>
        </Box>
    </Container>
    
  )
}

export default SuccessPage