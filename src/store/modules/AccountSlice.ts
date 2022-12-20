import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UserType } from '../../types';

const adapter = createEntityAdapter<UserType>({
  selectId: item => item.email
});

export const { selectAll: selectAccount, selectById: selectAccountId } = adapter.getSelectors(
  (state: RootState) => state.account
);

const accountSlice = createSlice({
  name: 'account',
  initialState: adapter.getInitialState(),
  reducers: {
    addAccount: adapter.addOne
  }
});

export const { addAccount } = accountSlice.actions;
export default accountSlice.reducer;
