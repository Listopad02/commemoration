import React, {useState, useEffect, useCallback, useRef} from "react";
import { PrevButton, NextButton } from "./EmblaCarouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../style.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";

import { setCartIncrement,
         setCartPrice,
         pushToCart,
         removeLastElem,
         setCartLength,
         reduceCartLength,
         removeCartItem,
         setCartDecrement,
         removeFromCart } from "../../CartComponent/cartSlice";
import Image from 'next/image'
import Box from "@mui/material/Box";


const EmblaCarousel = ({ item, slides, reload, setReload }) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const incDec = useAppSelector(state => state.cart.cartIncDec)

  const [state, setState] = useState(null)
  const prevState = useRef()
  const dispatch = useAppDispatch();
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    loop: false
  });



  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  const showCartLength = (el) => {
    return incDec[el]
  }

    useEffect(() => {
        scrollPrev()
        scrollPrev()
        scrollPrev()
        scrollPrev()
        scrollPrev()
        scrollPrev()
        scrollPrev()
        scrollPrev()
        scrollPrev()
        scrollPrev()
        scrollPrev()
        scrollPrev()
    }, [item, scrollPrev])

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  function scrollPrevEffect() {
    if (!nextBtnEnabled) {
      scrollPrev()
      scrollPrev()
      scrollPrev()
      scrollPrev()
      scrollPrev()
      scrollPrev()
      scrollPrev()
      scrollPrev()
      scrollPrev()
      scrollPrev()
      scrollPrev()
      scrollPrev()
    }
  }


  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={viewportRef}>
        <div className={styles.embla__container}>
          {slides.map((el, index) => {

            return (
              <div className={styles.embla__slide} key={index}>
                <div className={styles.embla__slide__inner}>
                  <Image
                    loader={() => 'https://api.pominkizal.ru' + el.image}
                    src={'https://api.pominkizal.ru' + el.image}
                    alt='photo'
                    width={200}
                    height={200}
                    className={styles.embla__slide__img}
                  />
                  <p className={styles.text}>{el.name}</p>
                  <div
                    className={styles.div}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ marginRight: "115px" }}>
                      <p className={styles.weight}>{el.weight}г</p>
                      <p className={styles.price}>{el.price}P</p>
                    </div>
                    <div className={styles.btn__container}>
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={() => {
          scrollNext()
          scrollPrevEffect()
        }} enabled={true} />
    </div>
  );
};

export default EmblaCarousel;