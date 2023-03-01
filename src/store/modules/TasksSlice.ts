import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createTask, CreateTaskType, taskList } from '../../service/api.service';

export const taskListAction = createAsyncThunk('task/list', async (userId: string) => {
  const result = await taskList(userId);
  if (result.ok) {
    return result.data.livros;
  }
  return [];
});

export const creatTaskAction = createAsyncThunk('create/task', async (task: CreateTaskType) => {
  const result = await createTask(task);
  console.log(result.data);
  if (result.ok) {
    return result.data;
  }
});

const taskAdapter = createEntityAdapter<CreateTaskType>({
  selectId: item => item.id
});

export const { selectAll, selectById } = taskAdapter.getSelectors((state: any) => state.tasks);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(taskListAction.fulfilled, taskAdapter.setAll);
    builder.addCase(creatTaskAction.fulfilled, taskAdapter.addOne);
  }
});

export default tasksSlice.reducer;
