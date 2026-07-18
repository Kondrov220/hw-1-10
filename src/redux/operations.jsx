import { createAsyncThunk } from "@reduxjs/toolkit";

const URL = "https://699dc3e283e60a406a475fc5.mockapi.io"; 


export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${URL}/contacts`);
      if (!response.ok) throw new Error("Server error");
      return await response.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await fetch(`${URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ name, phone: number }), 
      });
      if (!response.ok) throw new Error("Server error");
      return await response.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await fetch(`${URL}/contacts/${contactId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Server error");
      return await response.json(); 
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);