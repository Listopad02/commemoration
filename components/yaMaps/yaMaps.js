import { YMaps, Map, Polygon, SearchControl } from 'react-yandex-maps';
import { Box } from "@mui/material";

import styles from '../NaborMenuComponent/style.module.css'
import stylese from './style.module.css'

import Image from 'next/image'
import one from '../../public/icons/vise.svg'
import two from '../../public/icons/mir.svg'
import three from '../../public/icons/mastercard.svg'
import four from '../../public/icons/paykeeper.svg'

const Maps = () => {
    return (
    <>
    <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '100px',
    }}>
        <div className={styles.border} />
        <p className={styles.title} style={{ margin: '0 20px 0 20px' }}>Оплата и доставка</p>
        <div className={styles.border} />
    </Box>
    <div className={stylese.description}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className={stylese.text__title}>
                Доставка
            </p>
            <p className={stylese.text__text}>
                Круглосуточно без выходных и праздников <br />
                Время и цена доставки зависит от зоны <br />
            </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className={stylese.text__title}>
                Оплата
            </p>
            <div className={stylese.text__text}>
                Принимается только онлайн оплата <br/>
                <br />
                К оплате принимаются платежные карты: VISA Inc, MasterCard WorldWide, МИР.
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '40px 0 0 0' }}>
                    <Image
                        className={stylese.img__logo}
                        loader={() => one.src}
                        src={one.src}
                        width={51}
                        height={16}
                        alt="visa"
                    />
                    <Image
                        className={stylese.img__logo}
                        loader={() => three.src}
                        src={three.src}
                        width={56}
                        height={15}
                        alt="visa"
                    />
                    <Image
                        className={stylese.img__logo}
                        loader={() => two.src}
                        src={two.src}
                        width={34}
                        height={21}
                        alt="visa"
                    />
                    <Image
                        className={stylese.img__logo}
                        loader={() => four.src}
                        src={four.src}
                        width={99}
                        height={37}
                        alt="visa"
                    />
                </div>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className={stylese.text__title}>Отказ от услуги</p>
            <span className={stylese.text__text}>Отказ от доставки регламентируется статьей 32 федерального закона «О защите прав потребителей», но  не менее чем за сутки</span>
        </div>
    </div>
    <YMaps>
        <div style={{width: '100%', position: 'relative', margin: '100px 0 0 0' }}>
            <Box sx={{
                position: { md: 'absolute', xs: 'relative' },
                top: { md: '179px', xs: '0'},
                left: { md: '79px', xs: '0' },
                width: { md: '391px', xs: '90%' },
                height: '371px',
                padding: {md: '29px 36px', xs: '10px 15px' },
                zIndex: { md: 999, xs: 0 },
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
                margin: { md: '0 0 20px 0 ', xs: '100px auto 50px auto' },

            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}>
                    <Box sx={{
                        padding: { md: '8px 32px', xs: '4px 16px' },
                        borderRadius: '20px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '22px',
                        lineHeight: '27px',
                        color: '#FFFFFF',
                        background: '#53B6FE',
                        width: { md: '128px', xs: '95px' },
                        textAlign: 'center',
                    }}>250 P</Box>
                    <p style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: '#000000',
                    }}>Зона доставки - 1</p>
                </Box>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <Box sx={{
                        width: { md: '128px', xs: '95px' },
                        padding: { md: '8px 32px', xs: '4px 16px' },
                        borderRadius: '20px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '22px',
                        lineHeight: '27px',
                        color: '#FFFFFF',
                        background: '#7FFE53',
                        textAlign: 'center',
                    }}>500 P</Box>
                    <p style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: '#000000',
                    }}>Зона доставки - 2</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <Box sx={{
                        width: { md: '128px', xs: '95px' },
                        padding: { md: '8px 32px', xs: '4px 16px' },
                        borderRadius: '20px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '22px',
                        lineHeight: '27px',
                        color: '#FFFFFF',
                        background: '#FDBD5A',
                        textAlign: 'center',
                    }}>750 P</Box>
                    <p style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: '#000000',
                        textAlign: 'center',
                    }}>Зона доставки - 3</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{
                        width: { md: '128px', xs: '95px' },
                        padding: { md: '8px 32px', xs: '4px 16px' },
                        borderRadius: '20px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '22px',
                        lineHeight: '27px',
                        color: '#FFFFFF',
                        background: '#F27874',
                    }}>1000 P</Box>
                    <p style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: '#000000',
                    }}>Зона доставки - 4</p>
                </div>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '0 0 300px 0', height: { xs:500, md: 700 }}}>
            <Map  width='90%' height='700' defaultState={{ center: [55.758493, 37.839271], zoom: 9, controls: [] }} >
                <Polygon
                    geometry={[
                        [
                            [55.799348, 37.937095],
                            [55.724800, 37.932081],
                            [55.718512, 37.883466],
                            [55.705361, 37.881947],
                            [55.709231, 37.838998],
                            [55.743776, 37.752128],
                            [55.757583, 37.747397],
                            [55.798119, 37.749469],
                            [55.810710, 37.829094],
                        ],

                    ]}
                    options={{
                        fillColor: '#53B6FE',
                        strokeColor: '#42aaff',
                        opacity: 0.6,
                        strokeWidth: 3,
                        strokeStyle: 'solid',
                    }}
                />
                <Polygon
                    geometry={[
                        [
                            [55.666808, 37.876809],
                            [55.702947, 37.792329],
                            [55.722609, 37.698867],
                            [55.701363, 37.624883],
                            [55.750249, 37.617829],
                            [55.795320, 37.633630],
                            [55.886220, 37.716289],
                            [55.903861, 37.754294],
                            [55.910780, 37.935957],
                            [55.885480, 38.000912],
                            [55.753236, 38.099209],
                            [55.697305, 38.036273],
                        ],
                        [
                            [55.799348, 37.937095],
                            [55.724800, 37.932081],
                            [55.718512, 37.883466],
                            [55.705361, 37.881947],
                            [55.709231, 37.838998],
                            [55.743776, 37.752128],
                            [55.757583, 37.747397],
                            [55.798119, 37.749469],
                            [55.810710, 37.829094],
                        ],
                        ]}
                    options={{
                        fillColor: '#7FFE53',
                        strokeColor: '#008000',
                        opacity: 0.5,
                        strokeWidth: 3,
                        strokeStyle: 'solid',
                    }} />
                <Polygon
                    geometry={[
                        [
                            [55.908434, 37.540855],
                            [55.950682, 37.821415],
                            [55.928470, 37.996498],
                            [55.876176, 38.212483],
                            [55.823875, 38.202571],
                            [55.727998, 38.263790],
                            [55.597478, 38.119803],
                            [55.547346, 37.773830],
                            [55.545045, 37.704022],
                            [55.568091, 37.666216],
                        ],
                        [
                            [55.666808, 37.876809],
                            [55.702947, 37.792329],
                            [55.722609, 37.698867],
                            [55.701363, 37.624883],
                            [55.750249, 37.617829],
                            [55.795320, 37.633630],
                            [55.886220, 37.716289],
                            [55.903861, 37.754294],
                            [55.910780, 37.935957],
                            [55.885480, 38.000912],
                            [55.753236, 38.099209],
                            [55.697305, 38.036273],
                        ],
                    ]}
                    options={{
                        fillColor: '#FDBD5A',
                        strokeColor: '#ffff00',
                        opacity: 0.4,
                        strokeWidth: 3,
                        strokeStyle: 'solid',
                    }} />

                <Polygon
                    geometry={[
                        [
                            [56.147572, 37.987843],
                            [56.054191, 38.316427],
                            [55.968580, 38.475876],
                            [55.970603, 38.571633],
                            [55.836978, 38.625136],
                            [55.692030, 38.397370],
                            [55.563641, 38.465817],
                            [55.512179, 38.383398],
                            [55.456739, 38.378265],
                            [55.406437, 38.359085],
                            [55.373473, 38.051975],
                            [55.409819, 37.973554],
                            [55.372826, 37.841433],
                            [55.397741, 37.797419],
                            [55.467526, 37.817541],
                            [55.505649, 37.761625],
                            [55.606667, 37.700730],
                            [55.614411, 37.579792],
                            [55.660616, 37.505268],
                            [55.775873, 37.399436],
                            [55.851282, 37.411297],
                            [55.923252, 37.454925],
                            [55.955138, 37.550382],
                            [55.958425, 37.639874],
                            [55.980058, 37.735271],
                            [55.989787, 37.870623],
                        ],
                        [
                            [55.908434, 37.540855],
                            [55.950682, 37.821415],
                            [55.928470, 37.996498],
                            [55.876176, 38.212483],
                            [55.823875, 38.202571],
                            [55.727998, 38.263790],
                            [55.597478, 38.119803],
                            [55.547346, 37.773830],
                            [55.545045, 37.704022],
                            [55.568091, 37.666216],
                        ],

                    ]}
                    options={{
                        fillColor: '#F27874',
                        strokeColor: '#ff0000',
                        opacity: 0.3,
                        strokeWidth: 3,
                        strokeStyle: 'solid',
                    }} />


            </Map>
            </Box>
        </div>
    </YMaps>
    </>
)}

export default Maps