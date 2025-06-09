import {createSlice} from "@reduxjs/toolkit";
import {AuthResponse} from "./models/auth";
import {login, register} from "./authThunk";
import {RootState} from "../../app/store";

interface AuthState {
    user: AuthResponse | null;
    authLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    authLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.authLoading = true;
        });
        builder.addCase(register.fulfilled, (state, {payload: user}) => {
            state.authLoading = false;
            state.user = user;
        });
        builder.addCase(register.rejected, (state) => {
            state.authLoading = false;
        });
        builder.addCase(login.pending, (state) => {
            state.authLoading = true;
        });
        builder.addCase(login.fulfilled, (state, {payload: user}) => {
            state.authLoading = false;
            state.user = user;
        });
        builder.addCase(login.rejected, (state) => {
            state.authLoading = false;
        });
    },
});

export const authReducer = authSlice.reducer;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserLoading = (state: RootState) => state.auth.authLoading;
