import { RootState } from '../../app/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Lover } from '../../models';
import { ListParams, PaginationParams, ListResponse } from '../../models/common';


export interface LoverState {
    loading : boolean;
    list: Lover[];
    filter: ListParams;
    pagination: PaginationParams;
}

const initialState: LoverState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 15,
    },
    pagination: {
        _page: 1,
        _limit: 15,
        _totalRows: 15,
    },
};


const loverSlice = createSlice ({
    name: 'lover',
    initialState,
    reducers: {
        fetchLoverList(state, action: PayloadAction<ListParams>) {
            state.loading = true;
        },
        fetchLoverListSuccess(state, action: PayloadAction<ListResponse<Lover>>) {
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
        },
        fetchLoverListFailed(state) {
            state.loading = false;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },

        setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    },
});

export const loverActions = loverSlice.actions;

export const selectLoverList = (state: RootState) => state.lover.list;
export const selectLoverLoading = (state: RootState) => state.lover.loading;
export const selectLoverFilter = (state: RootState) => state.lover.filter;
export const selectLoverPagination = (state: RootState) => state.lover.pagination;


const loverReducer = loverSlice.reducer;

export default loverReducer;