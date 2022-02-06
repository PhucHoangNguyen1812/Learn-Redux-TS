import React from 'react';
import {Box, Paper,Typography, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';


const theme = createTheme();
const paddingRoot = theme.spacing(2);
const lightRoot = theme.palette.primary.light;

const useStyles = makeStyles ((theme) => ({
    root: {
       display: 'flex',
       flexFLow: 'row nowrap',
       justifyContent: 'space-between',
       alignItems:'center',
       
       padding: paddingRoot,
       border: `1px solid ${lightRoot}`
    }
}))

export interface StatisticItemProps {
    icon: React.ReactElement;
    label : string;
    value : string | number;
}

export default function StatisticItem ({icon, label, value} : StatisticItemProps) {
    const classes = useStyles();

    return (
        <Paper className = {classes.root}>
            <Box>{icon}</Box>
            <Box>
                <Typography variant='h5' align ='right'>
                    {value}
                </Typography>
                <Typography variant='caption'>{label}</Typography>
            </Box>
        </Paper>
    )
}