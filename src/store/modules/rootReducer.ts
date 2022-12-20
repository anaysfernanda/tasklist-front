import { combineReducers } from '@reduxjs/toolkit';

import tasks from './TaskSlice';
import logged from './LoggedSlice';
import account from './AccountSlice';

export default combineReducers({
  tasks,
  logged,
  account
});
