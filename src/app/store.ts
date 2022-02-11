import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import { history } from '../utils';
import rootSaga from './rootSaga';
import loverReducer from '../features/lover/loverSlice'
import cityReducer from '../features/city/citySlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  dashboard: dashboardReducer,
  lover : loverReducer,
  city: cityReducer,
})

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(sagaMiddleware,routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
