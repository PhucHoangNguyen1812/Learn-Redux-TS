import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Box, Typography, Button, createTheme, LinearProgress, Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LoverTable from '../components/LoverTable';
import { selectCityMap,selectCityList } from '../../city/citySlice';
import { ListParams } from '../../../models';
import LoverFilters from '../components/LoverFilters';
import {
    selectLoverLoading,
    selectLoverFilter,
    selectLoverList,
    selectLoverPagination,
    loverActions,
} from '../loverSlice'



const theme = createTheme();

const useStyles = makeStyles(() => ({

  root: {
    position: 'relative',
    paddingTop : theme.spacing(1),
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },

}));



export default function ListPage() {

  const loverList = useAppSelector(selectLoverList);
  const pagination = useAppSelector(selectLoverPagination);
  const loading = useAppSelector(selectLoverLoading);
  const filter = useAppSelector(selectLoverFilter);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  const classes = useStyles();

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(loverActions.fetchLoverList(filter));
  },[dispatch,filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      loverActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(loverActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(loverActions.setFilter(newFilter))
  };

  
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Lovers</Typography>

        <Button variant="contained" color="primary">
          Thêm Mới
        </Button>
      </Box>

      <Box mb={3}>
        <LoverFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>
      <LoverTable loverList={loverList} cityMap= {cityMap}/>

      <Box my= {2} display = "flex" justifyContent="center">
        <Pagination
          color = "primary"
          count={Math.ceil(pagination?._totalRows / pagination?._limit)}
          page= {pagination._page}
          onChange= {handlePageChange}
        />
      </Box>
    </Box>
  );

}