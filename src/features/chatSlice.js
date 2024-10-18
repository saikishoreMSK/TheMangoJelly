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
        id: new Date().getTime(), // Unique ID for each message
        text: action.payload,
        user: state.currentUser,
        timestamp: format(new Date(), 'p'),
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        id: new Date().getTime(), // Unique ID for each message
        text: action.payload,
        user: 'Mango Jelly',
        timestamp: format(new Date(), 'p'),
      });
    },
    addReaction: (state, action) => {
      const { messageId, reaction } = action.payload;
      const message = state.messages.find(msg => msg.id === messageId);
      if (message) {
        if (!message.reactions) message.reactions = [];
        message.reactions.push(reaction); // Add the reaction to the message
      }
    },
  },
});

// Export actions to be used in components
export const { sendMessage, receiveMessage, addReaction } = chatSlice.actions;
export default chatSlice.reducer;
