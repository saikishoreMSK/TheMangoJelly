// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './features/chatSlice'; // We'll create chatSlice next

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});
