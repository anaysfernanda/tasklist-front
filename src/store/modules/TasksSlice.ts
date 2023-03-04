import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  createTask,
  CreateTaskType,
  deleteTask,
  DeleteTaskType,
  taskList,
  updateTask
} from '../../service/api.service';

const taskAdapter = createEntityAdapter<any>({
  selectId: (item: any) => item._id
});

export const taskListAction = createAsyncThunk('task/list', async (userId: string) => {
  const result = await taskList(userId);
  if (result.ok) {
    return result.data.tasks;
  }
  return [];
});

export const creatTaskAction = createAsyncThunk('create/task', async (task: CreateTaskType) => {
  const result = await createTask(task);
  console.log('task', result.data);
  if (result.ok) {
    return result.data;
  }
});

export const deleteTaskAction = createAsyncThunk('delete/tasks', async (task: DeleteTaskType) => {
  const result = await deleteTask(task);
  console.log('teste', result.data);
  if (result.ok) {
    return result.data[0]._id;
  }
  alert(result.message);
});

export const updateTaskAction = createAsyncThunk('update/tasks', async (task: CreateTaskType) => {
  const result = await updateTask(task);
  let changes = {};

  if (result.ok) {
    changes = {
      _title: task.title,
      _description: task.description
    };
  }

  return {
    id: task.id,
    changes
  };
});

export const { selectAll, selectById } = taskAdapter.getSelectors((state: any) => state.tasks);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(taskListAction.fulfilled, taskAdapter.setAll);
    builder.addCase(creatTaskAction.fulfilled, taskAdapter.addOne);
    builder.addCase(deleteTaskAction.fulfilled, taskAdapter.removeOne);
    builder.addCase(updateTaskAction.fulfilled, taskAdapter.updateOne);
  }
});

export default tasksSlice.reducer;
