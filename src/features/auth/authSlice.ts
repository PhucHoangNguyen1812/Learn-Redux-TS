import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface LoginPayLoad {
    username: string;
    password: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User;
}

const initialState: AuthState = {
    isLoggedIn : false,
    logging: false,
    currentUser: undefined
}

const authSlice = createSlice ({
    name:'auth',
    initialState,
    reducers: {
        login(state, action:PayloadAction<LoginPayLoad>) {
            state.logging = true;
        },
        loginSuccess(state, action:PayloadAction<User>) {
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        loginFailed(state, action:PayloadAction<String>) {
            state.logging = false;
        },

        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    },
})

export const authActions = authSlice.actions;


export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectLogging = (state: any) => state.auth.logging;

const authReducer  = authSlice.reducer;
export default authReducer;