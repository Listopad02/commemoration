import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import api from "../../api/api";
import Category from "./Category";

function Categories() {
  const [categories, setCategories] = useState(false);
  const [reLoad, setReload] = useState(0);
  useEffect(() => {
    async function fetchData() {
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

  const handleAdd = () => {
    const name = document.getElementById("category-name");
    if (name.value.length < 1) return alert("Введите имя категории");

    async function fetchData() {
      try {
        const res = await api("/categories", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
          }),
        });
        setReload(reLoad + 1);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  };

  if (!categories) return <>Loading</>;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "bottom", m: 3 }}>
        <TextField
          id="category-name"
          label="Имя категории"
          variant="outlined"
        />
        <Button variant="text" onClick={handleAdd}>
          Добавить
        </Button>
      </Box>
      {categories.map((category) => {
        return (
          <Category
            key={category.id}
            category={category}
            reLoad={reLoad}
            setReload={setReload}
          />
        );
      })}
    </>
  );
}
export default Categories;
