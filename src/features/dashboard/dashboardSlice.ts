import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lover } from "../../models";



export interface DashboardStatistics {
    maleCount: number;
    femaleCount: number;
    highMarkCount:  number;
    lowMarkCount: number;
}

export interface RankingByCity {
    cityId : string;
    cityName: string;
    rankingList: Lover[];
}

export interface DashboardState {
    loading: boolean;
    statistics: DashboardStatistics;
    highestLoverList : Lover[];
    lowestLoverList: Lover[];
    rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0,
    },
    highestLoverList: [],
    lowestLoverList: [],
    rankingByCityList: [],
}

const dashboardSlice = createSlice({
    name:'dashboard',
    initialState,
    reducers:{
        fetchData(state) {
            state.loading = true;
        },
        fetchDataSuccess(state) {
            state.loading = false;
        },
        fetchDataFailed(state) {
            state.loading = false;
        },
        setStatistics(state, action: PayloadAction<DashboardStatistics>) {
            state.statistics = action.payload;
        },
        setHighestLoverList(state, action: PayloadAction<Lover[]>) {
            state.highestLoverList = action.payload;
        },
        setLowestLoverList(state, action: PayloadAction<Lover[]>) {
            state.lowestLoverList = action.payload;
        },
        setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
            state.rankingByCityList = action.payload;
        },

    },
});

export const dashboardActions = dashboardSlice.actions;

export const selectDashboardLoading = (state : RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state : RootState) => state.dashboard.statistics;
export const selectHighestLoverList = (state : RootState) => state.dashboard.highestLoverList;
export const selectLowestLoverList = (state : RootState) => state.dashboard.lowestLoverList;
export const selectRankingByCityList = (state : RootState) => state.dashboard.rankingByCityList;


const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
