import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CreateIcon from "@mui/icons-material/Create";
import { styled } from "@mui/material/styles";
import api from "../../api/api";
import { useState } from "react";

function Product({ dish, reLoad, setReload }) {
  const [correct, setCorrect] = useState(false);
  const handleDel = () => {
    async function fetchData() {
      try {
        await api(`/dishes/${dish.id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setReload(reLoad + 1);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  };

  const Input = styled("input")({
    display: "none",
  });

  const handlePhoto = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.set("image", event.target.files[0], "image.png");
    try {
      const res = await api(`/dishes/${dish.id}/upload`, {
        method: "POST",
        body: formdata,
      });
      setReload(reLoad + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCorrect = async (event) => {
    event.preventDefault();

    const correct = {};
    Object.values(event.target).map((e) => {
      if (e.nodeName === "INPUT")
        if (e.value.length > 0) correct[e.name] = e.value;
    });

    try {
      const res = await api(`/dishes/${dish.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(correct),
      });
      setReload(reLoad + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box>
          <Avatar
            alt={dish.name}
            src={"https://api.pominkizal.ru" + dish.image}
          />
        </Box>
        <Box sx={{ flexGrow: 1, ml: 1 }}>
          {dish.name}
          {" - "}
          {dish.price}
          {"р/"}
          {dish.weight}
          {dish.weight > 15 ? "гр" : "шт"}
        </Box>
        <Box>
          <label htmlFor={dish.id}>
            <Input
              onChange={handlePhoto}
              accept="image/*"
              id={dish.id}
              type="file"
            />
            <IconButton aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <IconButton onClick={() => setCorrect(!correct)} aria-label="delete">
            <CreateIcon />
          </IconButton>
          <IconButton onClick={handleDel} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      {correct ? (
        <Box
          component="form"
          onSubmit={handleCorrect}
          sx={{ m: 1, display: "flex", flexDirection: "row" }}
        >
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
            Сохранить
          </Button>
        </Box>
      ) : (
        false
      )}
    </>
  );
}

export default Product;
