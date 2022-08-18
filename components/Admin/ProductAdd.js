import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import api from "../../api/api";
import { useState, useEffect } from "react";

function ProductAdd({ categories, reLoad, setReload }) {
  const [category, setCategory] = useState(categories[0].id);

  const handleCategory = (event) => {
    const id = event.target.value;
    setCategory(id);
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      const res = await api("/dishes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.target.name.value,
          price: event.target.price.value,
          category: category,
          weight: event.target.weight.value,
        }),
      });
      setReload(reLoad + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!categories) return <>Loading</>;

  return (
    <Box
      component="form"
      onSubmit={handleAdd}
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 3,
      }}
    >
      <Select
        sx={{ width: "200px" }}
        id="dishCategory"
        value={category}
        onChange={handleCategory}
      >
        {categories.map((category) => {
          return (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          );
        })}
      </Select>
      <TextField
        sx={{ width: "200px", mt: 1 }}
        name="name"
        id="dishName"
        label="Название"
        variant="outlined"
      />
      <TextField
        sx={{ width: "200px", mt: 1 }}
        name="price"
        id="dishPrice"
        label="Цена"
        variant="outlined"
      />
      <TextField
        sx={{ width: "200px", mt: 1 }}
        name="weight"
        id="dishPrice"
        label="Вес"
        variant="outlined"
      />
      <Button type="submit" sx={{ width: "200px", mt: 1 }}>
        Добавить
      </Button>
    </Box>
  );
}

export default ProductAdd;
