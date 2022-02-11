import { ListParams, ListResponse } from './../../models/common';
import { PayloadAction } from "@reduxjs/toolkit";
import { Lover } from '../../models';
import loverApi from '../../api/loverApi';
import { call, put, takeLatest, debounce} from 'redux-saga/effects';
import { loverActions } from './loverSlice';

function* fetchLoverList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Lover> = yield call (
            loverApi.getAll, action.payload
        );
        yield put (loverActions.fetchLoverListSuccess(response));


    } catch (error) {
        console.log ('Lỗi đến từ lover data', error);
        yield put(loverActions.fetchLoverListFailed);
    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put (loverActions.setFilter(action.payload));
}

export default function* loverSaga() {
    yield takeLatest (loverActions.fetchLoverList, fetchLoverList);
    yield debounce (500, loverActions.setFilterWithDebounce.type, handleSearchDebounce);
}