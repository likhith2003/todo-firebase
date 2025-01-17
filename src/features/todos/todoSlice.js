import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
  todos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a new todo
export const createTodo = createAsyncThunk(
  "todos/create",
  async (todoData, thunkAPI) => {
    try {
      return await todoService.createTodo(todoData);
    } catch (error) {
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all todos for the user
export const getTodos = createAsyncThunk("todos/getAll", async (_, thunkAPI) => {
  try {
    return await todoService.getTodos();
  } catch (error) {
    const message = error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete a todo
export const deleteTodo = createAsyncThunk("todos/delete", async (id, thunkAPI) => {
  try {
    return await todoService.deleteTodo(id);
  } catch (error) {
    const message = error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
