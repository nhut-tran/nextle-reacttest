import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './authAPI';

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || null) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  loading: false,
  error: null,
};

// Thunks
export const signup = createAsyncThunk('auth/signup', async (payload, { dispatch }) => {
  await api.signup(payload);
  const loginRes = await dispatch(login({ email: payload.email, password: payload.password }));
  return loginRes.payload;
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const res = await api.login({ email, password });
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  localStorage.setItem('user', JSON.stringify(res.user));
  return res;
});

export const logout = createAsyncThunk('auth/logout', async (_, { getState }) => {
  const { refreshToken, accessToken } = getState().auth;
  await api.logout({ refreshToken }, accessToken);
  localStorage.clear();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserFromStorage(state) {
      const token = localStorage.getItem('accessToken');
      const email = localStorage.getItem('email');
      if (token && email) {
        state.accessToken = token;
        state.user = { email };
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(login.rejected, (state) => {
        state.error = 'Invalid login';
      })
      .addCase(signup.rejected, (state) => {
        state.error = 'Signup failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      });
  }
});

export const { setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
