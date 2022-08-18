import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiResolver } from "next/dist/server/api-utils/node";
import api from "../../../api/api";
import { headerSlice } from "../../Header/headerSlice";

export const getDishes = async () => {
  const res = await api("/dishes", {
    method: "GET",
  });
  return res;
};

export const dishesSlice = createSlice({
  name: "menu",
  initialState: {
    dish: {
      id: 0 || null,
      name: "" || null,
      image: "" || null,
      price: 0 || null,
      weight: 0 || null,
      size: 0 || null,
      category: {
        id: 0 || null,
        name: "" || null,
        image: "" || null,
      },
    },
    maxLength: null
  },
  reducers: {
    setDish: (state, action) => {
      state.dish = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setMax: (state, action) => {
      state.maxLength = action.payload
    }
  },
  extraReducers: {},
});

const { actions, reducer } = dishesSlice;

export const {
  setDish,
  setCategory,
  setMax,
} = actions;
export default reducer;
