import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Logged from '../../types/Logged';

const user: string = Logged();
const initialState = user;

const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    doLogin(_, action: PayloadAction<string>) {
      localStorage.setItem('logged', action.payload);
      return action.payload;
    }
  }
});

export const { doLogin } = loggedSlice.actions;
export default loggedSlice.reducer;
