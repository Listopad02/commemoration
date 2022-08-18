import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import Link from "next/link";

const categories = [
  {
    id: 'Поминки',
    children: [
      {
        id: 'Меню',
        link: '/menu'
      },
      {
        id: 'Добавить Блюдо',
        link: '/addDish'
      },
      {
        id: 'Добавить Категорию',
        link: '/addCategory'
      },
      {
        id: 'Удалить Категорию',
        link: '/deleteCategory'
      },
      {
        id: 'Изменить категорию',
        link: '/editCategory'
      }

    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};


function Navigator() {

  const history = useNavigate()

  const exit = () => {
    localStorage.clear();
    history('/')
  }


  return (
    <Drawer
      variant="permanent">
      <List
        disablePadding>
        {categories.map(({ id, children }) => (
          <Box
            key={id} sx={{
              bgcolor: '#101F33'
            }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, link, active }) => (
              <ListItem disablePadding key={childId}>
                <Link href={link}>
                  <a>
                    <ListItemButton selected={active} sx={item}>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </a>
                </Link>
              </ListItem>
            ))}
            <ListItem
              onClick={exit}
              disablePadding key={'exit'}>
              <Link href="/">
                <a>
                  <ListItemButton sx={item}>
                    <ListItemText>Выход</ListItemText>
                  </ListItemButton>
                </a>
              </Link>
            </ListItem>
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

export default Navigator;