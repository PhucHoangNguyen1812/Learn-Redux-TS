import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { createTheme } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

const theme = createTheme();
const selected = theme.palette.action.selected;

const useStyles = makeStyles({

  link: {
    color:'inherit',
    textDecoration : 'none',
    '&.active > div': {
      backgroundColor: selected ,
    }
  }
});

export function Sidebar() {

  const classes  = useStyles();
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <NavLink to="/admin/trang-chu" className={classes.link}>
            <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Trang Chủ" />
            </ListItem>
          </NavLink>
          <NavLink to="/admin/nguoi-yeu" className={classes.link}>
            <ListItem button>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Người Yêu Của Tôi" />
            </ListItem>
          </NavLink>
        </List>
      </nav>
    </Box>
  );
}
