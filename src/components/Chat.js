// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, receiveMessage } from '../features/chatSlice';
import { Box, TextField, Button, Paper, List, ListItem, ListItemText } from '@mui/material';

const Chat = () => {
    const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);  // Error state



  // Simulate receiving a message after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(receiveMessage('Hello from the other side!'));
    }, 5000);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleSendMessage = () => {
    if (input.trim() === '') {
      setError(true);
      return;
    }
    setError(false);
    dispatch(sendMessage(input));
    setInput(''); // Clear input field after sending
  
    // Simulate a response from "Other" after a delay
    setTimeout(() => {
      const responses = [
        "I'm good, thanks!",
        "How about you?",
        "Let's chat!",
        "That's interesting!",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      dispatch(receiveMessage(randomResponse));
    }, 1000);  // Simulated delay of 2 seconds
  };
  

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: 2,
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* Chat Messages List */}
      <Paper sx={{ flex: 1, overflowY: 'auto', padding: 2, marginBottom: 2 }}>
    <List>
      {messages.map((message, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={message.text}
            secondary={`${message.user} - ${message.timestamp}`}
          />
        </ListItem>
      ))}
      {/* Empty div to mark the end of the messages */}
      <div ref={messagesEndRef}></div>
    </List>
  </Paper>

      {/* Message Input Field */}
      <Box sx={{ display: 'flex' }}>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Type a message..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      error={error}
      helperText={error ? "Message cannot be empty" : ""}
      sx={{ marginRight: 1 }}
    />
    <Button variant="contained" color="primary" onClick={handleSendMessage}>
      Send
    </Button>
  </Box>
    </Box>
  );
};

export default Chat;
