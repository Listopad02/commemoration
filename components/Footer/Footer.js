import styles from './style.module.css'

import { Container, Typography, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";

export const Footer = () => {
    return (
        <Box className={styles.footer}>
            <div className={styles.logo} />
            <Box className={styles.box}>
                <Box className={styles.nav}>
                    <Link className={styles.link} href='/'>
                        <a className={styles.link}>Главная</a>
                    </Link>
                    <Link className={styles.link} href='/cart'>
                        <a className={styles.link}>Корзина</a>
                    </Link>
                    <Link className={styles.link} href='/menu'><a className={styles.link}>Наше меню</a></Link>
                    <Link className={styles.link} href='/nabor'><a className={styles.link}>Готовые наборы</a></Link>
                    <Link className={styles.link} href='/contacts'><a className={styles.link}>Контакты</a></Link>
                </Box>
                <Box className={styles.nav}>
                    <p className={styles.link_title}>Дополнительные услуги:</p>
                    <Link className={styles.link} href='/'><a href='https://tyteda.ru/' target="_blank" rel="noopener noreferrer" className={styles.link}>Доставка готовой еды</a></Link>
                    <Link className={styles.link} href='/'><a href='https://shashlandia.ru/' target="_blank" rel="noopener noreferrer" className={styles.link}>Все для пикника</a></Link>
                    <Link className={styles.link} href='/'><a href='http://vezu-banket.ru/' target="_blank" rel="noopener noreferrer" className={styles.link}>Везу банкет</a></Link>
                    <Link className={styles.link} href='/'><a href='https://corp-pitanie.tyteda.ru/' target="_blank" rel="noopener noreferrer" className={styles.link}>Корпоротивное питание</a></Link>
                </Box>
                <Box className={styles.nav}>
                    <p className={styles.contact}>
                        <PhoneIcon className={styles.icon} />
                        +7 (495) 139-64-44
                    </p>
                    <p className={styles.contact}>
                        <EmailIcon className={styles.icon} />
                        dostavka@tyteda.ru
                    </p>
                    <Link className={styles.link} href='politika-konfidentsialnosti'>
                        <a className={styles.link}>
                            Политика конфиденциальности
                        </a>
                    </Link>
                </Box>
            </Box>
            <Box sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
                <p style={{ margin: '0', color: 'white', textAlign: 'center' }}>ООО &quot;БКФ&quot; ОГРН: 5177746201221 ИНН: 7720402524 Не является публичной офертой 2022</p>
                <p style={{ margin: '0', color: 'white', textAlign: 'center' }}>Сделано WETOP digital agency</p>
            </Box>
        </Box>
    )
}