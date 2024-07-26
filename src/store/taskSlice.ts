import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (token: string) => {
    const response = await axios.get('/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: any, { getState }: any) => {
    const token = (getState() as any).user.token;
    const response = await axios.post('/api/tasks', task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (task: any, { getState }: any) => {
    const token = (getState() as any).user.token;
    const response = await axios.put('/api/tasks', task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      const index = state.findIndex((task: any) => task._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
  },
});

export const { updateTaskStatus } = taskSlice.actions;

export default taskSlice.reducer;
