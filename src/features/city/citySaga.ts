import { cityActions } from './citySlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import cityApi from '../../api/cityApi';
import { City } from '../../models/city';
import { ListResponse } from './../../models/common';
function* fetchCityList() {
    try {
        const response: ListResponse<City> = yield call(cityApi.getAll);
        yield put(cityActions.fetchCityListSuccess(response));
    } catch (error) {
        console.log('Lỗi đến từ city data', error);
        yield put(cityActions.fetchCityListFailed());
    }
}
export default function* citySaga() {
    yield takeLatest(cityActions.fetchCityList.type,fetchCityList)
}
