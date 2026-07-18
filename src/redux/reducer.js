import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { items: [], isLoading: false, filter: "" },
  reducers: { setFilter(state, action) { state.filter = action.payload; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addContact.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteContact.fulfilled, (state, action) => { state.items = state.items.filter(item => item.id !== action.payload.id); });
  }
});
export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;