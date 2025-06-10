import {createSlice} from "@reduxjs/toolkit";
import {AuthResponse} from "./models/auth";
import {login, register, searchFriend} from "./authThunk";
import {RootState} from "../../app/store";

interface AuthState {
    user: AuthResponse | null;
    authLoading: boolean;
    friends: AuthResponse[];
    friendsLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    authLoading: false,
    friends: [],
    friendsLoading: false,
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
        builder.addCase(searchFriend.pending, (state) => {
            state.friendsLoading = true;
        });
        builder.addCase(searchFriend.fulfilled, (state, {payload: friends}) => {
            state.friendsLoading = false;
            state.friends = friends;
        });
        builder.addCase(searchFriend.rejected, (state) => {
            state.friendsLoading = false;
        });
    },
});

export const authReducer = authSlice.reducer;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserLoading = (state: RootState) => state.auth.authLoading;
export const selectFriends = (state: RootState) => state.auth.friends;
export const selectFriendsLoading = (state: RootState) => state.auth.friendsLoading;
