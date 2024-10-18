// src/features/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const initialState = {
  messages: [],  // List of chat messages
  currentUser: 'You',  // Simulate the current user
};

const validReactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

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
      const { messageId, reaction } = action.payload; // Destructure messageId and reaction from payload
      const message = state.messages.find(msg => msg.id === messageId); // Find the message by ID

      if (message && validReactions.includes(reaction)) { // Check if the reaction is valid
        if (!message.reactions) message.reactions = []; // Initialize reactions if not present
        message.reactions.push(reaction); // Add the reaction to the message
      }
    },
  },
});

// Export actions to be used in components
export const { sendMessage, receiveMessage, addReaction } = chatSlice.actions;
export default chatSlice.reducer;
