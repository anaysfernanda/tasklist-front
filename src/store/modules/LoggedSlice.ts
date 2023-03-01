import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UserType } from '../../types';

const adapter = createEntityAdapter<UserType>({
  selectId: item => item.email
});

export const { selectAll: selectLogged, selectById: selectLoggedId } = adapter.getSelectors(
  (state: RootState) => state.logged
);

const loggedSlice = createSlice({
  name: 'logged',
  initialState: adapter.getInitialState(),
  reducers: {
    addLogged: adapter.addOne
  }
});

export const { addLogged } = loggedSlice.actions;
export default loggedSlice.reducer;
