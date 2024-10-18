// src/features/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const initialState = {
  messages: [],  // List of chat messages
  currentUser: 'You',  // Simulate the current user
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        text: action.payload,
        user: state.currentUser,
        timestamp: format(new Date(), 'p'),
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        text: action.payload,
        user: 'Other',
        timestamp: format(new Date(), 'p'),
      });
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
