import Menu from "./Menu";
import Orders from "./Orders";
import Categories from "./Categories";
import Products from "./Products";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import { Box } from "@mui/material";
import { useState } from "react";

const style = {
  admin: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    background: "white",
  },
  content: {
    margin: "20px",
  },
};

const items = {
  1: {
    id: 1,
    name: "Заказы",
    icon: <LooksOneIcon />,
    page: <Orders />,
  },
  2: {
    id: 2,
    name: "Категории",
    icon: <LooksTwoIcon />,
    page: <Categories />,
  },
  3: {
    id: 3,
    name: "Товары",
    icon: <Looks3Icon />,
    page: <Products />,
  },
};

function Admin() {
  const [page, setPage] = useState(1);

  return (
    <>
      <Menu items={items} setPage={setPage} />
      <Box style={style.admin}>
        <Box style={style.content} sx={{ flexGrow: 1 }}>
          {items[page].page}
        </Box>
      </Box>
    </>
  );
}

export default Admin;
