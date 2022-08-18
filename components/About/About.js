import { Container, Typography, Box } from "@mui/material";
import imageAbout from '../../public/Image/AboutImage.png'
import style from './style.module.css'
import Image from 'next/image'
import one from '../../public/icons/svg1.svg'
import two from '../../public/icons/svg2.svg'
import three from '../../public/icons/svg3.svg'

const About = () => {
    return (
        <Container className={style.container}>
            <Box className={style.box}>
                <div className={style.border} />
                <h2 className={style.title}>О нас</h2>
                <div className={style.border} />
            </Box>
            <Box className={style.box__text}>
                <p className={style.text}>
                    Наша компания организовывает поминальные обеды уже более восьми лет и может предложить вам поминальную трапезу по оптимальному соотношению цены и качества.
                    <br />
                    <br />
                    При обращении к нам поминальная трапеза обойдется намного дешевле, поскольку
                    мы работаем без посредников и вы обращаетесь напрямую в производство.
                    <br />
                    <br />
                    Мы находим индивидуальный подход к каждому клиенту и гарантируем сохранность и доставку заказа в установленный срок.
                    <br />
                    <br />
                    Компания работает круглосуточно,
                    без выходных.
                </p>
                <Image
                    loader={() => imageAbout.src}
                    alt='photo'
                     width={460}
                     height={490}
                     src={imageAbout.src}
                     className={style.image}
                />
            </Box>
            <Box className={style.cards}>
                <Box className={style.card}>
                    <Image
                            loader={() => one.src}
                            alt='photo'
                            width={67}
                            height={58}
                            className={style.card__logo}
                            src={one.src} />
                    <p className={style.card__text}>
                        Индивидуальный подход
                        <br />
                        к клиенту
                    </p>
                </Box>
                <Box className={style.card}>
                    <Image
                         loader={() => two.src}
                         alt='photo'
                         width={67}
                         height={58}
                         className={style.card__logo}
                         src={two.src} />
                    <p className={style.card__text}>
                        Приготовим и доставим
                        <br />
                        за 24 часа
                    </p>
                </Box>
                <Box className={style.card}>
                    <Image
                        loader={() => three.src}
                        alt='photo'
                        width={67}
                        height={58}
                        className={style.card__logo}
                        src={three.src} />
                    <p className={style.card__text}>
                        Только свежие
                        <br />
                        и качественные продукты
                    </p>
                </Box>
            </Box>
        </Container>
    )
}

export default About