import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { MenuSlider } from "../MenuSlider/MenuSlider";
import Link from "next/link";
import api from "../../api/api";
import {
    setDish,
    setCategory,
    setMax,
} from "./redux/dishesSlice";

import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import Slider from "../MenuSlider/MobileSwiper/MobileSwiper";
import {useRouter} from "next/router";

export const MenuComponent = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.dishes.category);
  const dishes = useAppSelector(state => state.dishes.dish)
  const [item, setItem] = useState(null);
  const [reload, setReload] = useState(0)

  const handleItem = (id) => {
    setItem(id);
  };
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

  useEffect(() => {
      setTimeout(() => {
          setReload(r=> r + 1)
      }, 100)
      getDishes();
      getCategory();
  }, [item])

  useEffect(() => {
    if(dishes.length > 0) {
        const dishArr = dishes
        const catObj = {};
        dishArr.map(e=>{
            catObj[e.category.id] = 0;
        })
        dishArr.map(e=>{
            catObj[e.category.id] += 1;
        })
        const getMaxKey = obj => {
            const maxValue = Math.max.apply(null, Object.values(obj))
            return Object.keys(obj).filter(k => obj[k] === maxValue)
        }

        if(item === null) {
            setItem(Number(getMaxKey(catObj)))
        }
    }
  }, [reload, dishes, item]);


    if (!category) return <>Loading</>;

  return (
    <Container>
      <Box className={styles.box}>
        <Box className={styles.box__title}>
          <div className={styles.border} />
          <h2 className={styles.title}>Наше меню</h2>
          <div className={styles.border} />
        </Box>
        <p className={styles.text}>
          Выбирайте понравившиеся блюда и добавляйте их в корзину
        </p>
      </Box>
      <Box sx={{ width: "218px", margin: "36px auto 39px auto" }}>
        <Link href="/nabor" className={styles.btn_link}>
          <a className={styles.btn_link}>Перейти в наборы</a>
        </Link>
      </Box>
      <Box
        className={styles.box__links}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        { category ? category.map((el, i) => {
          if(el.name !== 'Наборы') {
           return (
               <button
                   key={i}
                   className={styles.btn}
                   type="button"
                   onClick={() => handleItem(el.id)}
               >
                 {el.name}
               </button>
           );
         }
        }) : null }
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Slider links={category} handleItem={handleItem} />
      </Box>
      <Box className={styles.box__slider}>
        { item !== null && <MenuSlider item={item} reload={reload} setReload={setReload}/> }
      </Box>
    </Container>
  );
};
