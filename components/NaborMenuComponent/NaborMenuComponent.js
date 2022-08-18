import React, {useEffect, useState} from 'react'
import styles from './style.module.css'
import {Container, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import {
    pushToCart,
    setCartIncrement,
    removeLastElem,
    setCartPrice,
    setCartDecrement,
    removeCartItem,
    reduceCartLength,
    removeFromCart,
    setCartLength,
} from '../CartComponent/cartSlice';
import Link from "next/link";
import Image from 'next/image'
import noImage from '../../public/Image/no-camera--v1.png'
import api from "../../api/api";
import {setCategory, setDish} from "../MenuComponent/redux/dishesSlice";
import { useRouter } from "next/router";
import mini from '../../public/Image/mini.jpg'
import middle from '../../public/Image/middle.jpg'
import big from '../../public/Image/big.jpg'

const arrTest = [
    {
      id: 144,
      image: mini,
      title: 'Мини',
      description: 'Рассчитан на 6-8 персон ',
      weight: '~10кг',
      price: 10000,
      structure: [
          {
              name: 'Суп-лапша с курицей',
              w: '1000мл'
          },
          {
              name: 'Борщ с говядиной',
              w: '1000мл'
          },
          {
              name: 'Блины 12 штук',
              w: '780г'
          },
          {
              name: 'Картофель отварной',
              w: '600г'
          },
          {
              name: 'Овощи на пару',
              w: '600г',
          },
          {
              name: 'Хачапури по-имеретински',
              w: '550г (30см)'
          },
          {
              name: 'Курица отварная ',
              w: '~1100г'
          },
          {
              name: 'Говядина отварная',
              w: '1000г'
          },
          {
              name: 'Кутья с изюмом ',
              w: '1000г'
          },
          {
              name: 'Лаваш армянский',
              w: '300г'

          },
          {
              name: 'Хлебная корзина',
              w: '400г'
          },
          {
              name: 'Морс ягодный',
              w: '1000мл'
          },
          {
              name: 'Компот из сухофруктов',
              w: '1000мл'
          },
      ]
    },
    {
        id: 145,
        image: middle,
        title: 'Средний',
        description: 'Рассчитан на 10-12 персон ',
        weight: '~25кг',
        price: 22000,
        structure: [
            {
                name: 'Суп-лапша с курицей',
                w: '1500мл'
            },
            {
                name: 'Борщ с говядиной',
                w: '1500мл'
            },
            {
                name: 'Блины 20 штук',
                w: '1300г'
            },
            {
                name: 'Оливье',
                w: '600г'
            },
            {
                name: 'Винегрет',
                w: '600г',
            },
            {
                name: 'Язычки из баклажанов жаренные с чесноком',
                w: '900г',
            },
            {
                name: 'Сырное ассорти',
                w: '400г'
            },
            {
                name: 'Селедочка на троих',
                w: '900г'
            },
            {
                name: 'Лобио по грузински',
                w: '750г'
            },
            {
                name: 'Хачапури по-имеретински',
                w: '1100г (30см) 2шт'
            },
            {
                name: 'Курица отварная',
                w: '~2200г'

            },
            {
                name: 'Говядина отварная',
                w: '2000г'
            },
            {
                name: 'Кутья с изюмом',
                w: '2000г'
            },
            {
                name: 'Лаваш армянский',
                w: '600г'
            },
            {
                name: 'Хлебная корзина',
                w: '800г'
            },
            {
                name: 'Морс ягодный',
                w: '4000мл'
            },
            {
                name: 'Компот из сухофруктов',
                w: '4000мл'
            },
        ]
    },
    {
        id: 146,
        image: big,
        title: 'Большой',
        description: 'Рассчитан на 25-30 персон ',
        weight: '~57кг',
        price: 53000,
        structure: [
            {
                name: 'Суп-лапша с курицей',
                w: '3500мл'
            },
            {
                name: 'Борщ с говядиной',
                w: '3500мл'
            },
            {
                name: 'Блины 50 штук',
                w: '3250г'
            },
            {
                name: 'Оливье',
                w: '2000г'
            },
            {
                name: 'Винегрет',
                w: '2000г',
            },
            {
                name: 'Язычки из баклажанов жаренные с чесноком',
                w: '1500г',
            },
            {
                name: 'Сырное ассорти',
                w: '1200г'
            },
            {
                name: 'Селедочка на троих',
                w: '2400г'
            },
            {
                name: 'Лобио по грузински',
                w: '2000г'
            },
            {
                name: 'Хачапури по-имеретински',
                w: '1650г (30см) 3шт'
            },
            {
                name: 'Пирог осетинский с мясом',
                w: '2400г'

            },
            {
                name: 'Курица отварная',
                w: '~4400г'
            },
            {
                name: 'Говядина отварная',
                w: '5000г'
            },
            {
                name: 'Кутья с изюмом',
                w: '3500г'
            },
            {
                name: 'Лаваш армянский',
                w: '1500г'
            },
            {
                name: 'Хлебная корзина',
                w: '2000г'
            },
            {
                name: 'Морс ягодный',
                w: '8000мл'
            },
            {
                name: 'Компот из сухофруктов',
                w: '8000мл'
            },
        ]
    },

]

export const NaborMenuComponent = () => {
    const cartItems = useAppSelector(state => state.cart.cartItems)
    const dispatch = useAppDispatch()
    const [modal, setModal] = useState(null)
    const [reload, setReload] = useState(0)
    const incDec = useAppSelector(state => state.cart.cartIncDec)

    useEffect(() => {
        const getDishes = async () => {
            try {
              const res = await api("/dishes", {
                method: "GET",
              });
              dispatch(setDish(res.data));
            } catch (err) {
              console.log(err);
            }
          };
        
          const getCategory = async () => {
            try {
              const res = await api("/categories", {
                method: "GET",
              });
              dispatch(setCategory(res.data));
            } catch (err) {
              console.log(err);
            }
          };
        setTimeout(() => {
            setReload(r=> r + 1)
        }, 100)
        getDishes();
        getCategory();
    }, [dispatch])

    const dishes = useAppSelector(state => state.dishes.dish)

    const handleModal = (id) => {
        setModal(id)
    }
    const handleClose = () => {
        setModal(0)
    }
    const showCartLength = (el) => {
        return incDec[el]
    }

    return (
        <Container>
            <Box className={styles.box}>
                <Box className={styles.box__title}>
                    <div className={styles.border} />
                    <h2 className={styles.title}>Готовые наборы</h2>
                    <div className={styles.border} />
                </Box>
                <p className={styles.text}>Выберите подходящий вам набор блюд, согласно количеству гостей</p>
            </Box>
            <Box sx={{ width: "201px", margin: "36px auto 39px auto" }}>
                <Link href="/menu" className={styles.btn_link}>
                    <a className={styles.btn_link}>Перейти в меню</a>
                </Link>
            </Box>
            <Box className={styles.nabor}>
                {arrTest.map((el, i) => {
                    return (
                             <Box key={i} className={styles.card}>
                                <Image
                                    loader={() => el.image.src}
                                    width={250}
                                    height={300}
                                    src={el.image.src}
                                    className={styles.img} alt='photo'/>
                                <Box className={styles.description}>
                                    <h4 className={styles.card__title}>{el.title}</h4>
                                    <p className={styles.card__text}>{el.description}</p>
                                    <Box className={styles.box__btn}>
                                        <Box>
                                            <p className={styles.card__weight}>{el.weight}</p>
                                            <p className={styles.card__price}>{el.price} Р</p>
                                        </Box>
                                        <div className="btn-container">
                                            <button
                                                className={incDec[el.id] > 0 ? styles.btn : styles.none}
                                                onClick={() => {
                                                    dispatch(setCartDecrement(el.id))
                                                    dispatch(removeCartItem(el.price))
                                                    dispatch(reduceCartLength())
                                                    setReload(reload + 1)
                                                    if (incDec[el.id] === 0 ) {
                                                        dispatch(removeFromCart({ payload: {id: el.id, price: el.price} }))
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                            <button
                                                className={styles.btn}
                                                onClick={() => {
                                                    setReload(reload + 1)
                                                    if (!cartItems.includes(el)) {
                                                        // dispatch(pushToCart(el));
                                                        dishes.forEach((item) => {
                                                            if(item.id === el.id) {
                                                                dispatch(pushToCart(item))
                                                            }
                                                        })
                                                        dispatch(setCartIncrement(el.id));
                                                    } else {
                                                        dispatch(setCartIncrement(el.id));
                                                    }
                                                    cartItems.forEach((item) => {
                                                        if (item.id === el.id && !cartItems.includes(el)) {
                                                            dispatch(removeLastElem());
                                                        }
                                                    });
                                                    dispatch(setCartPrice( {payload: {id: el.id, price: el.price, name: el.name}} ))
                                                    dispatch(setCartLength())
                                                }}
                                            >
                                                {
                                                    showCartLength(el.id) > 0 ? incDec[el.id] : "+"
                                                }
                                            </button>
                                        </div>
                                    </Box>
                                    <button onClick={() => handleModal(el.id)} className={styles.btn__info}>Подробнее</button>
                                </Box>
                                 {modal === el.id &&
                                     <Modal
                                         open={open}
                                         onClose={handleClose}
                                         aria-labelledby="modal-modal-title"
                                         aria-describedby="modal-modal-description"
                                     >
                                         <Box sx={{
                                             position: 'absolute',
                                             top: '50%',
                                             left: '50%',
                                             transform: 'translate(-50%, -50%)',
                                             // width: '80%',
                                             height: 500,
                                             backgroundColor: '#b8b8b8',
                                             border: '2px solid #000',
                                             boxShadow: 24,
                                             p: 4,
                                             borderRadius: '20px',
                                             display: 'flex',
                                             justifyContent: 'space-between'
                                         }}
                                         className={styles.modal__box}
                                         >
                                             <Box sx={{
                                                 display: 'flex',
                                             }}
                                                  className={styles.box__img}
                                             >
                                                 <Image
                                                     loader={() => el.image.src}
                                                     width='300px'
                                                     height='300px'
                                                     alt='photo'
                                                     src={el.image.src}
                                                     className={styles.img} />
                                                 <Box sx={{
                                                     margin: { md: '0 0 0 50px', xs: '0' }
                                                 }}>
                                                     <h4 style={{ fontSize: '35px', color: 'black', textAlign: 'left' }} className={styles.card__title}>{el.title}</h4>
                                                     <p style={{ fontSize: '17px',color: 'black', textAlign: 'left' }} className={styles.card__text}>{el.description}</p>
                                                     <Box sx={{ display: 'flex' }}>
                                                         <Box sx={{ marginRight: '50px' }}  >
                                                             <p style={{ fontSize: '18px',color: 'black' }} className={styles.card__weight}>{el.weight}</p>
                                                             <p style={{ fontSize: '29px', color: 'black', width: '100px' }} className={styles.card__price}>{el.price} Р</p>
                                                         </Box>
                                                         <div className="btn-container" style={{ display: 'flex' }}>
                                                             <button
                                                                 className={incDec[el.id] > 0 ? styles.btn : styles.none}
                                                                 onClick={() => {
                                                                     setReload(reload + 1)
                                                                     dispatch(setCartDecrement(el.id))
                                                                     dispatch(removeCartItem(el.price))
                                                                     dispatch(reduceCartLength())
                                                                     if (incDec[el.id] === 0 ) {
                                                                         dispatch(removeFromCart({ payload: {id: el.id, price: el.price} }))
                                                                     }
                                                                 }}
                                                             >
                                                                 -
                                                             </button>
                                                             <button
                                                                 className={styles.btn}
                                                                 onClick={() => {
                                                                     setReload(reload + 1)
                                                                     if (!cartItems.includes(el)) {
                                                                         dispatch(pushToCart(el));
                                                                         dispatch(setCartIncrement(el.id));
                                                                     } else {
                                                                         dispatch(setCartIncrement(el.id));
                                                                     }
                                                                     cartItems.forEach((item) => {
                                                                         if (item.id === el.id && !cartItems.includes(el)) {
                                                                             dispatch(removeLastElem());
                                                                         }
                                                                     });
                                                                     dispatch(setCartPrice( {payload: {id: el.id, price: el.price, name: el.name}} ))
                                                                     dispatch(setCartLength())
                                                                 }}
                                                             >
                                                                 {
                                                                     showCartLength(el.id) > 0 ? incDec[el.id] : "+"
                                                                 }
                                                             </button>
                                                         </div>
                                                     </Box>
                                                 </Box>
                                                 </Box>
                                             <Box sx={{
                                                 overflow: 'auto',
                                                 marginLeft:  { md: '50px', xs: '0' },
                                             }} className={styles.box__nabor}>
                                                 <p id="modal-modal-title" variant="h6" component="h2" style={{ fontSize: '1.7rem', marginBottom: '15px' }}>
                                                     В набор входит:
                                                 </p>
                                                 <ul style={{ width: '300px' }}>
                                                     {el.structure.map((element, i) => {
                                                         return <li key={i + 100} className={styles.li__modal}>{element.name} {element.w}</li>
                                                     })}
                                                 </ul>
                                         </Box>
                                         </Box>
                                     </Modal>
                                 }
                        </Box>
                    )
                })}
            </Box>
        </Container>
    )
}