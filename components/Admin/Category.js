import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";
import { useEffect, useState } from "react";

function Category({ category, reLoad, setReload }) {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api(`/dishes?groupBy=category&id=${category.id}`, {
          method: "GET",
        });
        setDishes(res.data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, [category.id]);

  const handleDel = () => {
    async function fetchData() {
      try {
        await api(`/categories/${category.id}`, {
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

  if (!dishes) return <>Loading</>;

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
          <Avatar>{category.id}</Avatar>
        </Box>
        <Box sx={{ flexGrow: 1, ml: 1 }}>
          {category.name}:{dishes.length}
        </Box>
        <Box>
          <IconButton onClick={handleDel} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </>
  );
}
export default Category;
