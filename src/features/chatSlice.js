// src/features/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const initialState = {
  messages: [],
  currentUser: 'You',
};

const validReactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        id: new Date().getTime(),
        text: action.payload,
        user: state.currentUser,
        timestamp: format(new Date(), 'p'),
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        id: new Date().getTime(),
        text: action.payload,
        user: 'Mango Jelly',
        timestamp: format(new Date(), 'p'),
      });
    },
    addReaction: (state, action) => {
      const { messageId, reaction } = action.payload;
      const message = state.messages.find(msg => msg.id === messageId);
      if (message && validReactions.includes(reaction)) {
        if (!message.reactions) message.reactions = [];
        message.reactions.push(reaction);
      }
    },
  },
});

export const { sendMessage, receiveMessage, addReaction } = chatSlice.actions;
export default chatSlice.reducer;
