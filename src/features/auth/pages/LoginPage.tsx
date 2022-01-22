import { Box, Button,CircularProgress,createTheme,Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as  React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions } from '../authSlice';

const theme = createTheme();
const space = theme.spacing(3);

const useStyles = makeStyles((theme) => ({
   root: {
        display :'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight:"100vh",
   },
   box: {
        padding: space,

   },
}));

export default function LoginPage () {
    
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector(state => state.auth.logging)
    const handleLoginClick = () => {
        dispatch(authActions.login({
            username: '',
            password:'',
        }))
    }
    
    return <div className= {classes.root}>
        <Paper elevation={1} className= {classes.box}>
            <Typography variant='h5' component='h1'>Quản Lý Người Yêu</Typography>

            <Box mt={4}>
                <Button fullWidth variant="contained" color= "primary" onClick={handleLoginClick}>
                    {isLogging && <CircularProgress size={20} color='secondary'></CircularProgress>} &nbsp; Đăng Nhập</Button>
            </Box>
        </Paper>
    </div>;
}