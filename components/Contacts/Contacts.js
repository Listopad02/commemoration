import styles from './style.module.css'
import {Container, Box, Typography} from "@mui/material";
import style from "../About/style.module.css";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export const Contacts = () => {
    return (
        <Container className={styles.cont}>
            <Box className={styles.box}>
                <div className={styles.border} />
                <h2 className={styles.title}>Контакты</h2>
                <div className={styles.border} />
            </Box>
            <Box className={styles.map}>
                <Box className={styles.contact}>
                    <p className={styles.contact__title}>Режим работы:</p>
                    <p className={styles.work__time}>Круглосуточно</p>
                    <p className={styles.description}>Без выходных</p>
                    <p className={styles.contact__title}>Адрес:</p>
                    <p className={styles.address}>г. Москва, ул. Сталеваров,<br /> дом. 14, корпус 1</p>
                    <p className={styles.contact__title}>Свяжитесь с нами:</p>
                    <p className={styles.contacts}>
                        <PhoneIcon className={styles.icon} />
                        +7 (495) 139-64-44
                    </p>
                    <p className={styles.contacts}>
                        <EmailIcon className={styles.icon} />
                        dostavka@tyteda.ru
                    </p>
                </Box>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A49fc947da3b7db9c9f8b47a2d880e51d126e1433bbd4e02ae18aedb398039c23&amp;source=constructor"
                    width="100%" height="610px" frameBorder="0"
                    className={styles.map}
                />
            </Box>
        </Container>
    )
}