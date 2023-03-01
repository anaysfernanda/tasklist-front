import { combineReducers } from '@reduxjs/toolkit';

import tasks from './TasksSlice';
import logged from './LoggedSlice';
import login from './LoginSlice';

export default combineReducers({
  tasks,
  logged,
  login
});
