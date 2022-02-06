import React from 'react';
import { Box,Paper, Typography,createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';


const theme = createTheme();
const paddingRoot = theme.spacing(2);
const borderRoot = theme.palette.primary.light;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: paddingRoot,
    border: borderRoot,
  },
}));

export interface WidgetProps {
  title: string;
  children: any;
}

export default function Widget({ title, children }: WidgetProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="button">{title}</Typography>

      <Box mt={2}>{children}</Box>
    </Paper>
  );
}