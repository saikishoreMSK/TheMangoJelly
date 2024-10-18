// src/components/Chat.js
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Menu, MenuItem, Avatar, ListItem, ListItemText, Box, Paper, List, TextField, Button } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { sendMessage, receiveMessage, addReaction } from '../features/chatSlice'; // Ensure all actions are imported

const Chat = () => {
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMessageId, setCurrentMessageId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = () => {
    setIsTyping(true);
    // Reset typing indicator after a delay (e.g., 2 seconds)
    setTimeout(() => setIsTyping(false), 2000);
  };

  // Call the send message function on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage(); 
    }
  };

  const handleClick = (event, messageId) => {
    setAnchorEl(event.currentTarget);
    setCurrentMessageId(messageId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReaction = (reaction) => {
    dispatch(addReaction(currentMessageId, reaction));
    handleClose();
  };

  // Simulate receiving a message after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(receiveMessage('Hello, How Can I Help You!'));
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
    setInput('');
    setIsTyping(false);
    // Simulate a response from "Mango Jelly" after a delay
    setTimeout(() => {
      const responses = [
        "I'm good, thanks!",
        "How about you?",
        "Let's chat!",
        "That's interesting!",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      dispatch(receiveMessage(randomResponse));
    }, 1000);  // Simulated delay of 1 second
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
            <ListItem key={index} sx={{ justifyContent: message.user === 'You' ? 'flex-end' : 'flex-start' }}>
              <Avatar 
                sx={{ marginRight: 1 }} 
                src={message.user === 'You' ? '/images/user.png' : '/images/mango.png'}
                alt={message.user === 'You' ? 'User Avatar' : 'Mango Avatar'}
              />
              <ListItemText
                primary={message.text}
                secondary={`${message.user} - ${message.timestamp}`}
                sx={{
                  backgroundColor: message.user === 'You' ? '#C8E6C9' : '#FFE0B2',
                  borderRadius: 2,
                  padding: 1,
                  maxWidth: '80%',
                  margin: 1,
                  boxShadow: 1,
                }}
              />
              <IconButton onClick={(event) => handleClick(event, message.id)}>
                <EmojiEmotionsIcon />
              </IconButton>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {['👍', '❤️', '😂', '😮', '😢', '😡'].map((reaction) => (
                  <MenuItem key={reaction} onClick={() => handleReaction(reaction)}>
                    {reaction}
                  </MenuItem>
                ))}
              </Menu>

              {message.reactions && message.reactions.length > 0 && (
                <div style={{ marginTop: '5px', display: 'flex' }}>
                  {message.reactions.map((reaction, index) => (
                    <span key={index} style={{ marginRight: '5px' }}>{reaction}</span>
                  ))}
                </div>
              )}
            </ListItem>
          ))}
          {/* Typing indicator */}
  {isTyping && (
    <ListItem sx={{ justifyContent: 'center', marginTop: 2 }}>
      <ListItemText primary="User is typing..." secondary="" />
    </ListItem>
  )}
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
  onChange={(e) => {
    setInput(e.target.value);
    handleTyping(); // Call the typing handler here
  }}
  onKeyPress={handleKeyPress}
  error={error}
  helperText={error ? "Message cannot be empty" : ""}
  sx={{ marginRight: 1 }}
/>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#FF9800', '&:hover': { backgroundColor: '#F57F20' } }} 
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
