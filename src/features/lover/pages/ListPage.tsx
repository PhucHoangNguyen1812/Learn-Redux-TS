import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Box, Typography, Button, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import StudentTable from '../components/LoverTable'
import { selectLoverList, loverActions} from '../loverSlice'
import LoverTable from '../components/LoverTable';

const theme = createTheme();

const useStyles = makeStyles(() => ({

  root: {},

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

}));



export default function ListPage() {

  const loverList = useAppSelector(selectLoverList);
  const classes = useStyles();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      loverActions.fetchLoverList({
        _page: 1,
        _limit: 15,
      })
    );
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Lovers</Typography>

        <Button variant="contained" color="primary">
          Thêm Mới
        </Button>
      </Box>

      {/* StudentTable */}
      <LoverTable loverList={loverList} />

      {/* Pagination */}
    </Box>
  );

}