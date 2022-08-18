import React, {useEffect, useState, useRef} from 'react'
import { Button, 
         Container, 
         ToggleButton, 
         ToggleButtonGroup, 
         Typography,
         Modal } from "@mui/material";
import Box from "@mui/material/Box";
import styles from './style.module.css'
import CartItem from './CartItem';
import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import TextField from '@mui/material/TextField';
import api from '../../api/api'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker, TimePicker} from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { clearCart, setInputAddr } from './cartSlice'
import CartAdressAutoComlete from "./CartAdressAutoComlete"
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import arSaLocale from 'date-fns/locale/ar-SA';
import enLocale from 'date-fns/locale/en-US';
import Recommendation from "./Recommendation";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const localeMap = {
    en: enLocale,
    fr: frLocale,
    ru: ruLocale,
    ar: arSaLocale,
};

const CartComponent = (effect, deps) => {
    useEffect(() => {
        preventScroll()
    })

    const regExpValidName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
    const regExpValidPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    const regExpValidMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const dispatch = useAppDispatch()
    const cartLength = useAppSelector(state => state.cart.cartLength)
    const cartItems = useAppSelector(state => state.cart.cartItems)
    const totalPrice = useAppSelector(state => state.cart.totalPrice)
    const wholeOrder = useAppSelector(state => state.cart.wholeOrder)
    const [comment, setComment] = useState('')
    const [input, setInput] = useState(false)
    const [value, setValue] = useState(new Date((Date.now() + 12 * (60 * 60 * 1000))))
    const today = new Date((Date.now() + 12 * (60 * 60 * 1000)));
    const [locale, setLocale] = useState('ru');
    const [visibility, setVisibility] = useState(false)
    const inputAddr = useAppSelector(state => state.cart.inputAddr)
    const [orders, setOreders] = useState(false);
    const [values, setValues] = useState({
        name: '' || null,
        phone: '' || null,
        email: '' || null,
        comment: '' || null,
        deliveryMethod: 'pickup' || 'delivery',
    })
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [zone, setZone] = useState(0);

    const result = zone === 1 ? "#53B6FE" : 
                   zone === 2 ? "#7FFE53" :
                   zone === 3 ? "#FDBD5A" : 
                   zone === 4 ? "#F27874" :
                   "#ccc"



    const preventScroll = () => {
        window.addEventListener('scroll', () => {
            const sticky = document.querySelector('#sticky')
            const root = document.querySelector('#root')
            const verticalScroll = window.scrollY
            const screenWidth = window.screen.width

            if (sticky && root && verticalScroll <= root.scrollHeight - 590 && screenWidth > 970) {
                sticky.style.top = `${verticalScroll + 140}px`
            }
        })
    }

    const res = {};
    wholeOrder.forEach(function(a){
        res[a] = res[a] + 1 || 1;
    });
    
    const deliveryPrice = 250 * zone

    const [address, setAddress] = useState({
        street: '',
        entrance: '',
        storey: '',
        apartment: '',
    })

    const handleAddress = (e) => {
        setAddress({...address, street: e.target.value})
    }
    const orderNumber = Math.floor(Math.random() * 10000)
    const adr = ['Адрес', inputAddr, 'Подьезд', address.entrance, 'этаж', address.storey, 'квартира', address.apartment, 'НОМЕР ЗАКАЗА', orderNumber].toString()
    const date = [value].toString()

    const postOrder = async () => {
        if (error === true) {
           setErrorMessage('Заполните форму')
        } else if (values.name === null || values.phone === null || values.email === null || (values.deliveryMethod === 'delivery' && zone === 0)) {
            setError(true)
            setErrorMessage('Заполните форму')
        } else if (cartLength === 0) {
            setError(true)
            setErrorMessage("Ваша корзина пуста!")
        } else if (values.deliveryMethod === 'delivery' && zone === 0) {
            setError(true)
            setErrorMessage("Мы не работаем в этой зоне!")
        } else {
            await api('/orders', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dishes: res,
                    date: date,
                    comment: values.comment !== '' || null ? values.comment : '',
                    deliveryMethod: values.method,
                    deliveryAddress: address.street !== '' && address.street !== null ? adr : 'Самовывоз',
                    customer: {
                        first_name: values.name,
                        last_name: values.deliveryMethod !== 'pickup' ? adr : 'Caмовывоз',
                        email: values.email,
                        phone: values.phone,
                    }
                })
            })
            setZone(0)
            dispatch(clearCart())
            values.name = ''
            values.phone = ''
            values.email = ''
            values.comment = ''
            setAddress({ street: '', entrance: '', storey: '', apartment: '' });
            setComment('');
        }
    }

    useEffect(() => {
        if(cartLength !== 0) {
            setVisibility(true)
        }
        else {
            setVisibility(false)
        }
    }, [cartLength])


    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setValues({...values, [name]: value})
    }
    const handleChangeAddress = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setAddress({...address, [name]: value});
    }
    const handleInput = (e) => {
        e.preventDefault()
        setInput(!input)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await api("/orders", {
                    method: "GET",
                });
                setOreders(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const orderId = () => {
        if(orders.length > 10) {
            return orders[orders.length-1].id + 1
        }
    }

    useEffect(() => {
        if(address.street !== inputAddr) {
            setZone(0)
        }
    }, [inputAddr, address.street])

    useEffect(() => {
        if (zone !== 0) {
            setError(false)
            setErrorMessage('')
        } else if (zone === 0 && values.deliveryMethod !== 'pickup') {
            setError(true)
            setErrorMessage('Доставка в данную зону недоступна!')
        } else if (zone === 0 && values.deliveryMethod === 'pickup' && values.name && values.phone && values.email) {
            setError(false)
            setErrorMessage('')
        }
    }, [zone, values.deliveryMethod, values.name, values.phone, values.email])

    return (
        <Container className={styles.background} id="root">
            <Box>
            <Box sx={{ margin: '0 auto', marginTop: "100px" }}>
                <h2 className={styles.cart__title}>Корзина</h2>
                <Box className={styles.cart__box}>
                    {cartItems.map((el, i) => {
                        return (
                            <CartItem key={i+1234555}
                                      id={el.id}
                                      src={el.image}
                                      name={el.name}
                                      title={el.title}
                                      price={el.price}
                            />
                        )
                    })}
                </Box>
            </Box>
             {visibility &&
                 <Recommendation />
             }
            <form className={styles.form}>
                <p className={styles.form__title}>
                    Персональные данные
                </p>
                <input
                    className={styles.form__input}
                    type='text'
                    name='name'
                    value={values.name}
                    onChange={(e) => handleChange(e)}
                    placeholder='Имя и Фамилия'
                    onFocus={() => {
                        setError(false)
                        setErrorMessage('')
                    }}
                    onBlur={() => {
                        if(!regExpValidName.test(values.name)) {
                            setError(true)
                            setErrorMessage('Проверьте правильность написания имени')
                        }
                    }}
                />
                {error &&
                    <Box sx={{
                        position: 'fixed',
                        zIndex: '999',
                        bottom: '20px',
                        left: '40%',
                        width: '300px',
                        height: '100px',
                        background: '#c2383d',
                        display: 'flex',
                        justifyContent: 'space-around',
                        padding: '0 20px',
                        alignItems: 'center',
                        borderRadius: '30px'
                    }}>
                        <PriorityHighIcon sx={{ color: 'white', width: '30px', height: '30px' }} />
                        <Typography sx={{ color: 'white', textAlign: 'center' }}>{errorMessage}</Typography>
                    </Box>
                }
                <Box className={styles.box__input}>
                    <input
                        className={`${styles.form__input} ${styles.margin}`}
                        type='text'
                        name='phone'
                        value={values.phone}
                        onChange={(e) => handleChange(e)}
                        placeholder='Телефон'
                        onFocus={() => {
                            setError(false)
                            setErrorMessage('')
                        }}
                        onBlur={() => {
                            if(!regExpValidPhone.test(values.phone)) {
                                setError(true)
                                setErrorMessage('Проверьте правильность написания номера')
                            }
                        }}
                    />
                    <input
                        className={styles.form__input}
                        type='email'
                        name='email'
                        value={values.email}
                        onChange={(e) => handleChange(e)}
                        placeholder='E-mail'
                        onFocus={() => {
                            setError(false)
                            setErrorMessage('')
                        }}
                        onBlur={() => {
                            if(!regExpValidMail.test(values.email)) {
                                setError(true)
                                setErrorMessage('Проверьте правильность написания почты')
                            }
                        }}
                    />
                </Box>
                <Box className={styles.delivery}>
                    <p className={styles.form__title}>Способ доставки</p>
                    <p><input type='radio' 
                              name='deliveryMethod' 
                              value="delivery" 
                              id='1' 
                              onClick={(e) => {
                                  handleChange(e)
                                  if (!inputAddr) {
                                    setError(true)
                                    setErrorMessage('Укажите Ваш адрес')
                                  }
                              }} />Курьер</p>
                    <p><input type='radio' 
                              name='deliveryMethod' 
                              value="pickup" 
                              id='2' 
                              onClick={(e) => {
                                  handleChange(e)
                                  setZone(0)
                                  setAddress({ street: '', storey: '', entrance: '', apartment: '' })
                                  if (values.name && values.phone && values.email) {
                                    setError(false)
                                    setErrorMessage('')
                                  }
                              }} checked={values.deliveryMethod === 'pickup' ? true  : false} />Самовывоз</p>
                </Box>
                <Box className={styles.adress}>
                    <CartAdressAutoComlete setAddress={setAddress} setZone={setZone}/>
                    <p className={styles.form__title}>Адрес</p>
                    <input
                        id="suggest"
                        className={styles.form__input}
                        type='text'
                        name='street'
                        value={address.street}
                        placeholder='Город, улица, дом'
                        disabled={values.deliveryMethod === 'pickup' ? true : false}
                        onFocus={() => {
                            if (zone === 0) {
                                setError(true)
                                setErrorMessage('Доставка для этой зоны недоступна!')  
                            }
                            else if (zone !== 0) {
                                setError(false)
                                setErrorMessage('')
                            }
                        }}
                        onChange={(e) => {
                            handleAddress(e)
                            setError(false)
                            setErrorMessage('') 
                        }}
                        onBlur={() => {
                            setError(false)
                            setErrorMessage('')
                            if (zone === 0) {
                                setError(true)
                                setErrorMessage('Доставка для этой зоны недоступна!')    
                            }
                        }}
                    />
                    <Box className={styles.box__input}>
                        <input
                            className={`${styles.form__input} ${styles.margin_two}`}
                            type='text'
                            name='entrance'
                            value={address.entrance}
                            onChange={(e) => handleChangeAddress(e)}
                            placeholder='Подъезд'
                            disabled={values.deliveryMethod === 'pickup' ? true : false}
                            onFocus={() => {
                                setError(false)
                                setErrorMessage('')
                            }}
                        />
                        <input
                            className={`${styles.form__input} ${styles.margin_two}`}
                            type='text'
                            name='storey'
                            value={address.storey}
                            onChange={(e) => handleChangeAddress(e)}
                            placeholder='Этаж'
                            disabled={values.deliveryMethod === 'pickup' ? true : false}
                            onFocus={() => {
                                setError(false)
                                setErrorMessage('')
                            }}
                        />
                        <input
                            className={styles.form__input}
                            type='text'
                            name='apartment'
                            
                            onChange={(e) => handleChangeAddress(e)}
                            placeholder='Квартира'
                            disabled={values.deliveryMethod === 'pickup' ? true : false}
                            onFocus={() => {
                                setError(false)
                                setErrorMessage('')
                            }}
                        />
                    </Box>
                </Box>

                <Box className={styles.form__data_box}>
                    <p className={styles.form__title}>Укажите дату и время доставки</p>
                    <Box className={styles.block}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                            <div>
                                <ToggleButtonGroup value={locale} exclusive sx={{ mb: 2, display: 'none', zIndex: '-999' }}>
                                    {Object.keys(localeMap).map((localeItem) => (
                                        <ToggleButton
                                            key={localeItem}
                                            value={localeItem}
                                        >
                                            {localeItem}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Время доставки"
                                    value={value}
                                    onChange={(newValue) => {
                                        if (newValue > today) {
                                            setValue(newValue);
                                        } else {
                                            setValue(today)
                                        }
                                    }}
                                />
                            </div>
                        </LocalizationProvider>
                        </Box>
                </Box>
                <button className={styles.comment__btn} onClick={(e) => {handleInput(e)}}>
                    У меня есть комментарий
                </button>
                {input && <input
                    className={styles.form__input}
                    type='text'
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                        handleChange(e)
                    }}
                    name='comment'
                    placeholder='Введите ваш комментарий'
                   />
                }
            </form>
            </Box>
            <Box className={styles.sticky__box} id='sticky'>
                <h3 className={styles.sticky__title}>Ваш заказ</h3>
                <Box sx={{margin: '0 0 72px 0'}}>
                    <p className={styles.sticky__text}>
                        {cartItems.length} товара на сумму
                        <span>
                            { totalPrice }&nbsp;р
                        </span>
                    </p>
                    <Typography className={styles.sticky__text}>
                       <span>Стоимость доставки:
                           <span style={{ margin: '0 10px', backgroundColor: result, padding: '4px 10px', borderRadius: '20px', cursor: "pointer" }}>
                               Зона-{zone}
                            </span>
                        </span> { deliveryPrice } р
                    </Typography>
                    <Box id="boxMap" className={styles.modal}>
                        <div id="map" style={{width:"300px", height:"300px"}}></div>
                    </Box>
                </Box>
                <p className={styles.sticky__total}>
                    ИТОГО: {totalPrice + deliveryPrice} Р
                </p>
                <form method='POST'  action='https://pominki-dostavka.server.paykeeper.ru/create/'>
                    <div style={{ display: 'none' }}>
                        <input type='text' name='sum' value={totalPrice + deliveryPrice} /> <br />
                        <input type='text' name='orderid' value={orderNumber} /> <br />
                        <input type='text' name='service_name' value='Оплата заказа' /> <br />
                    </div>

                     <button className={styles.sticky__btn} type='submit' onClick={() => {

                         if ((zone === 0 && values.deliveryMethod === 'pickup') || 
                             (zone !== 0 && values.deliveryMethod === 'delivery')) {
                             postOrder()
                         }
                     }}
                            disabled={error ? true : false}
                     >Перейти к оплате</button>
                </form>
                <p className={styles.sticky__description}>
                    Только онлайн оплата
                </p>
            </Box>
        </Container>
    )
}

export default CartComponent