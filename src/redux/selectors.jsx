import { createSelector } from "@reduxjs/toolkit";

export const selectContactsItems = (state) => state.contacts.items;
export const selectContactsIsLoading = (state) => state.contacts.isLoading;
export const selectContactsError = (state) => state.contacts.error;
export const selectFilter = (state) => state.filter;


export const selectFilteredContacts = createSelector(
  [selectContactsItems, selectFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);