import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take} from "redux-saga/effects";
import { authActions, LoginPayLoad } from "./authSlice";

function* handleLogin(payload: LoginPayLoad) {

    try {
        yield delay(1000)
        localStorage.setItem('access_token','fake_login')
        yield put(authActions.loginSuccess({
                id: 1 ,
                name: 'Phuc',  
            })
        );
        yield put(push('/admin'));
    } catch (error: any) {
        yield put(authActions.loginFailed(error.message))
    }

}

function* handleLogout() {
    console.log("Logout");
    localStorage.removeItem('access_token');
    yield put(push('/login'))
}

function* watchLoginFLow() {
    while (true) {

        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayLoad> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        }


        yield take(authActions.logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFLow);
}