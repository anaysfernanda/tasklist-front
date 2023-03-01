import { combineReducers } from '@reduxjs/toolkit';

import tasks from './TaskSlice';
import logged from './LoggedSlice';
import login from './loginSlice';

export default combineReducers({
  tasks,
  logged,
  login
});
