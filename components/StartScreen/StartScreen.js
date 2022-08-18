import { useState } from 'react'
import { Container } from "@mui/material";
import Box from "@mui/material/Box";

import style from './style.module.css'
import Link from 'next/link'

export const StartScreen = () => {
    const [hover, setHover] = useState(0)

    return (
        <Container className={ style.container }>
            <Box>
                <Box className={style.box}>
                    <div className={style.border} />
                    <h3 className={style.title}>Доставка поминальных обедов</h3>
                    <div className={style.border} />
                </Box>
                <p className={style.text}>
                    Мы предоставляем Вам и Вашей семье персональный сервис по доставке поминальных обедов.
                </p>
            </Box>
            <Box className={style.box2}>
              <Box
                  onMouseEnter={() => {setHover(1)}}
                  onMouseLeave={() => {setHover(0)}}
                  >
                  <Link href='/menu' >
                      <Box className={style.boxImg1}>
                          <div className={style.hover} />
                            {hover === 1 &&
                                <Link
                                    className={style.hover__btn}
                                    href='/menu'
                                >
                                    <a className={style.hover__btn} >Смотреть меню</a>
                                </Link>
                            }
                            {hover !== 1 &&
                                <>
                                <p
                                    className={style.cardTitle}
                                >
                                    НАШЕ МЕНЮ
                                </p>
                                <p className={style.cardText}>
                                    Выбирайте понравившиеся блюда и добавляйте их в корзину
                                </p>
                                </>
                            }
                      </Box>
                  </Link>
              </Box>
              <Box
                   onMouseEnter={() => {setHover(2)}}
                   onMouseLeave={() => {setHover(0)}}>
                  <Link href='/nabor'>
                      <Box className={style.boxImg2}>
                          <div className={style.hover} />
                          {hover === 2 &&
                              <Link
                                  className={style.hover__btn}
                                  href='/nabor'
                              >
                                  <a className={style.hover__btn}>Смотреть наборы</a>
                              </Link>
                          }
                          {hover !== 2 &&
                              <>
                                  <p className={style.cardTitle}>ГОТОВЫЕ НАБОРЫ</p>
                                  <p className={style.cardText}>Выберите подходящий вам набор блюд, согласно количеству гостей</p>
                              </>
                          }
                      </Box>
                  </Link>
              </Box>
            </Box>
        </Container>
    )
}
