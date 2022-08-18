import React, {useEffect, useState} from "react";
import { Container } from "@mui/material";
import EmblaCarousel from "./EmblaCarusel/EmblaCarusel";
import testImg1 from "../../public/Image/testimg.png";
import { useAppSelector } from "../../redux/hooks.ts";
import Slider from "./MobileSwiper/MobileSwiper";
import { useAppDispatch } from "../../redux/hooks.ts";
import {  setMax } from '../MenuComponent/redux/dishesSlice'
export const MenuSlider = ({ item, reload, setReload }) => {
  const dishes = useAppSelector((state) => state.dishes.dish);
  const dispatch = useAppDispatch()

  const res = dishes.filter((dish) => {
    if(dish.category.name !== 'Наборы') {
      return dish.category.id === item;
    }
  });

  return (
    <Container sx={{ padding: 0 }}>
      <EmblaCarousel item={item} slides={res} reload={reload} setReload={setReload} />
    </Container>
  );
};
