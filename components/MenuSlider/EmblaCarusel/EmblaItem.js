import React from 'react'
import {useAppDispatch} from "../../../redux/hooks";
import {setId} from "../../Header/headerSlice";
import Image from 'next/image'
const EmblaItem = ({ id, image, name, weight, price }) => {
    const dispatch = useAppDispatch()
    dispatch(setId(id))
    return (
        <div className={styles.embla__slide} key={index}>
          <div className={styles.embla__slide__inner}>
            <Image
              width={200}
              height={200}
              loader={() => "https://api.pominkizal.ru" + image}
              src={"https://api.pominkizal.ru" + image}
              className={styles.embla__slide__img}
              alt='photo'
            />
            <p className={styles.text}>{name}</p>
            <div
              className={styles.div}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ marginRight: "115px" }}>
                <p className={styles.weight}>{weight}г</p>
                <p className={styles.price}>{price}P</p>
              </div>
              <button
                className={styles.btn}
                onClick={() => {
                  if (!cartItems.includes(el)) {
                    dispatch(pushToCart(el));
                    dispatch(setCartIncrement(id));
                  } else {
                    dispatch(setCartIncrement(id));
                  }
                  cartItems.forEach((item) => {
                    if (item.id === id && !cartItems.includes(el)) {
                      dispatch(removeLastElem());
                    }
                  });
                  dispatch(setCartPrice( {payload: {id, price, name}} ))
                  dispatch(setCartLength())
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      );
}

export default EmblaItem