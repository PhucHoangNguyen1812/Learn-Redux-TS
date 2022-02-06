import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { LinearProgress, Box, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import StatisticItem from './components/StatisticItem'
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestLoverList,
  selectLowestLoverList,
  selectRankingByCityList,
} from './dashboardSlice'
import { createTheme } from '@mui/system';
import {ArrowDownward, ArrowUpward, Female, Male} from '@mui/icons-material';
import LoverRankingList from './components/LoverRankingList';
import Widget from './components/Widget';

const theme = createTheme();
const paddingRoot = theme.spacing(1);
const paddingLoad = theme.spacing(-1);

const useStyles = makeStyles((theme) => ({

  root: {
    position: 'relative',
    paddingTop: paddingRoot,
  },

  loading: {
    position: 'absolute',
    top: paddingLoad,
    width: '100%',
  }

}));

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestLoverList = useAppSelector(selectHighestLoverList);
  const lowestLoverList = useAppSelector(selectLowestLoverList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);



  console.log({
    loading,
    statistics,
    highestLoverList,
    lowestLoverList,
    rankingByCityList,
  });

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>

      {loading && <LinearProgress className={classes.loading} />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3} >
          <StatisticItem
            icon={<Male fontSize="large" color="primary" />}
            label="Đàn Ông"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<Female fontSize="large" color="primary" />}
            label="Phụ Nữ"
            value={statistics.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ArrowUpward fontSize="large" color="primary" />}
            label="Tỉ Lệ Khuôn Mặt >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ArrowDownward fontSize="large" color="primary" />}
            label="Tỉ Lệ Khuôn Mặt <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      <Box mt={5}>
      <Typography variant="h4">Tất Cả</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6} >
              <Widget title= "Xếp Hạng Người Tỉ Lệ Khuôn Mặt Cao Nhất">
                  <LoverRankingList loverList={highestLoverList}/>
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Widget title="Xếp Hạng Người Tỉ Lệ Khuôn Mặt Thấp Nhất">
                <LoverRankingList loverList={lowestLoverList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={5}>
        <Typography variant="h4">Xếp Hạng Trong Thành Phố</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <LoverRankingList loverList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
