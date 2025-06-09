import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../app/axiosApi";
import {AuthMutation, AuthResponse, GlobalError} from "./models/auth";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<AuthResponse, AuthMutation, { rejectValue: GlobalError }>(
    'auth/register',
    async (user, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<{ user: AuthResponse }>('/auth', user);
            return response.data.user;
        } catch (error) {
            if (
                isAxiosError(error) &&
                error.response &&
                error.response.status === 422
            ) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }
    }
);

export const login = createAsyncThunk<AuthResponse, AuthMutation, { rejectValue: GlobalError }>(
    'auth/login',
    async (user, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<{ user: AuthResponse }>('/auth/sessions', user);
            return response.data.user;
        } catch (error) {
            if (
                isAxiosError(error) &&
                error.response &&
                error.response.status === 422
            ) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }
    }
);
