import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';
import loverSaga from '../features/lover/loverSaga';
import citySaga from '../features/city/citySaga';

export default function* rootSaga() {
     yield all([ authSaga(), dashboardSaga(), loverSaga(), citySaga()]);
}