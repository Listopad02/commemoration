import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Menu({ items, page, setPage }) {
  const [drawer, setDrawer] = useState(false);

  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  const handleExit = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={toggleDrawer(true)} aria-label="menu">
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "none", md: "Flex", flexGrow: 1 } }}>
              <Box sx={{ flexGrow: 1 }}>
                <ButtonGroup variant="contained" aria-label="menu">
                  {Object.values(items).map((item) => {
                    return (
                      <Button
                        key={item.id}
                        startIcon={item.icon}
                        onClick={() => setPage(item.id)}
                      >
                        {item.name}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  aria-label="exit"
                  startIcon={<LogoutIcon />}
                  onClick={handleExit}
                >
                  Выйти
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
        <List sx={{ flexGrow: 1 }}>
          {Object.values(items).map((item) => {
            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => setPage(item.id)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Button variant="text" aria-label="exit" onClick={handleExit}>
          Выйти
        </Button>
      </Drawer>
    </>
  );
}
