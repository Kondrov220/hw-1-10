import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = (token) => { axios.defaults.headers.common.Authorization = `Bearer ${token}`; };
const clearAuthHeader = () => { axios.defaults.headers.common.Authorization = ''; };

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/users/signup', credentials);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/users/login', credentials);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (e) { return thunkAPI.rejectWithValue(e.message); }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (e) { return thunkAPI.rejectWithValue(e.message); }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  if (!token) return thunkAPI.rejectWithValue('No token');
  setAuthHeader(token);
  try {
    const res = await axios.get('/users/current');
    return res.data;
  } catch (e) { return thunkAPI.rejectWithValue(e.message); }
});