import { createSelector } from '@reduxjs/toolkit';
export const selectIsLoading = state => state.contacts.isLoading;




export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    // 1. Захист: якщо контактів немає або це не масив — повертаємо порожній масив
    if (!contacts || !Array.isArray(contacts)) {
      console.warn("Contacts is not an array:", contacts);
      return [];
    }

    // 2. Захист: якщо фільтр undefined/null, робимо його порожнім рядком
    const normalizedFilter = typeof filter === 'string' ? filter.toLowerCase() : '';

    return contacts.filter(contact => {
      // 3. Захист: якщо сам контакт null/undefined, пропускаємо його
      if (!contact) return false;

      // 4. Захист: переконуємося, що name - це рядок, перш ніж викликати toLowerCase
      const name = typeof contact.name === 'string' ? contact.name : '';
      
      return name.toLowerCase().includes(normalizedFilter);
    });
  }
);