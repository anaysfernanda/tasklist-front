/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, LoginUserType } from '../../service/api.service';

export const loginAction = createAsyncThunk('user/Login', async (user: LoginUserType) => {
  const result = await loginUser(user);
  return result;
});

const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {} as any
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      return {
        user: action.payload.data
      };
    });
  }
});

export default LoginSlice.reducer;
