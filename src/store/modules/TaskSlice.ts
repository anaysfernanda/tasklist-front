import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { TaskType } from '../../types';

const adapter = createEntityAdapter<TaskType>({
  selectId: item => item.id
});

export const { selectAll: selectTasks, selectById: selectTasksId } = adapter.getSelectors(
  (state: RootState) => state.tasks
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {
    addTask: adapter.addOne,
    updateTask: adapter.updateOne,
    deleteTask: adapter.removeOne
  }
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
