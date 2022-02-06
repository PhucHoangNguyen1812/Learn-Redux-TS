import { Box, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as  React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../features/dashboard';
import Lover from '../../features/lover';
import { Header, Sidebar } from '../Common';


const theme = createTheme();
const light = theme.palette.primary.light;
const spacingMain = theme.spacing(2,3);
const spacingSb = theme.spacing(0.2,0.2);


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,
        minHeight: '100vh',
    },
    header: {
        gridArea: 'header',
        
    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${light}`,
        padding: spacingSb,
    },
    main: {
        gridArea: 'main',
        padding: spacingMain,
    },
}))

export function AdminLayout() {

    const classes = useStyles()
    return <Box className={classes.root}>
        <Box className={classes.header}>
            <Header />
        </Box>
        <Box className={classes.sidebar}>
            <Sidebar/>
        </Box>
        <Box className={classes.main}>
            <Switch>
                <Route path= "/admin/trang-chu">
                    <Dashboard/>
                </Route>
                <Route path= "/admin/nguoi-yeu">
                    <Lover/>
                </Route>
            </Switch>
        </Box>
    </Box>;
}