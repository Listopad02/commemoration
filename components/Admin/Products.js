import api from "../../api/api";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import Product from "./Product";
import ProductAdd from "./ProductAdd";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function Products() {
  const [dishes, setDishes] = useState(false);
  const [dishesFilter, setDishesFilter] = useState(false);
  const [categories, setCategories] = useState(false);
  const [category, setCategory] = useState("");
  const [reLoad, setReload] = useState(0);
  const [addDish, setAddDish] = useState(false);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api("/dishes", {
          method: "GET",
        });
        setDishesFilter(res.data);
        setDishes(res.data);
      } catch (error) {
        alert(error);
      }
      try {
        const res = await api("/categories", {
          method: "GET",
        });
        setCategories(res.data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, [reLoad]);

  const handleCategory = (event) => {
    const id = event.target.value;
    const res = dishes.filter((e) => {
      return e.category.id === id;
    });
    setDishesFilter(res);
    setCategory(id);
  };

  if (!dishes || !categories) return <>Loading</>;
  if (!dishesFilter) {
    setDishesFilter(dishes);
    return <>Loading</>;
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", m: 3 }}>
        <Button
          endIcon={addDish ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          variant="text"
          onClick={() => {
            setAddDish(!addDish);
            setFilter(false);
          }}
        >
          Добавить товар
        </Button>
        <Button
          endIcon={filter ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          variant="text"
          onClick={() => {
            setFilter(!filter);
            setAddDish(false);
          }}
        >
          Фильтр
        </Button>
      </Box>
      {filter ? (
        <Box sx={{ m: 3 }}>
          <Select
            onChange={handleCategory}
            sx={{ width: "200px" }}
            id="dishCategory"
            value={category}
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button onClick={() => setReload(reLoad + 1)}>Очистить фильтр</Button>
        </Box>
      ) : (
        false
      )}
      {addDish ? (
        <ProductAdd
          categories={categories}
          reLoad={reLoad}
          setReload={setReload}
        />
      ) : (
        false
      )}
      {dishesFilter.map((dish) => {
        return (
          <Product
            key={dish.id}
            dish={dish}
            reLoad={reLoad}
            setReload={setReload}
          />
        );
      })}
    </>
  );
}
export default Products;
