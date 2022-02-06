import { ListParams, ListResponse } from './../../models/common';
import { PayloadAction } from "@reduxjs/toolkit";
import { Lover } from '../../models';
import loverApi from '../../api/loverApi';
import { call, put, takeLatest } from 'redux-saga/effects';
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

export default function* loverSaga() {
    yield takeLatest (loverActions.fetchLoverList, fetchLoverList);
}