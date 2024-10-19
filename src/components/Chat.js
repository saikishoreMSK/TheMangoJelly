import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Avatar, ListItem, ListItemText, Box, Paper, List, TextField, Button, CircularProgress, Menu, MenuItem } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { sendMessage, receiveMessage, addReaction } from '../features/chatSlice';

const Chat = () => {
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMessageId, setCurrentMessageId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(receiveMessage('Hello, How Can I Help You!'));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleSendMessage = () => {
    if (input.trim() === '') {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);
    dispatch(sendMessage(input));
    setInput('');
    setIsTyping(false);
    
    setTimeout(() => {
      const responses = [
        "I'm good, thanks!",
        "How about you?",
        "Let's chat!",
        "That's interesting!",
        "Can you tell me more?",
        "What do you think about that?",
        "I'm here to help!",
        "Nice to hear from you!",
        "That sounds great!",
        "I totally agree!",
        "What else can I do for you?",
        "Tell me something fun!",
        "I'd love to know more.",
        "How was your day?",
        "Do you have any plans for the weekend?",
        "That's a great question!",
        "Thanks for sharing that!",
        "I'm curious about that too!",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      dispatch(receiveMessage(randomResponse));
      setLoading(false);
    }, 1000);
  };

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
        backgroundColor: darkMode ? '#333' : '#f0f0f0',
      }}
    >
      <Paper sx={{ flex: 1, overflowY: 'auto', padding: 2, marginBottom: 2, backgroundColor: darkMode ? '#424242' : 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          <img src='/images/Mango2.png' alt='Mango' width={200} />
          <IconButton onClick={toggleDarkMode} sx={{ marginRight: 2 }}>
            <Brightness4Icon sx={{ fontSize: '2rem' }} />
          </IconButton>
        </Box>
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
                  color: darkMode ? 'black' : 'black',
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
          {isTyping && (
            <ListItem sx={{ justifyContent: 'center', marginTop: 2 }}>
              <ListItemText primary="User is typing..." secondary="" />
            </ListItem>
          )}
          {loading && (
            <ListItem sx={{ justifyContent: 'center', marginTop: 2 }}>
              <CircularProgress />
            </ListItem>
          )}
          <div ref={messagesEndRef}></div>
        </List>
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleTyping();
          }}
          onKeyPress={handleKeyPress}
          error={error}
          helperText={error ? "Message cannot be empty" : ""}
          sx={{
            marginRight: 1,
            backgroundColor: darkMode ? '#424242' : '#fff',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? '#B0BEC5' : '#ccc',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#FF9800' : '#FF9800',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF9800',
              },
            },
            '& .MuiInputBase-input': {
              color: darkMode ? '#fff' : '#000',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{
            backgroundColor: darkMode ? '#FF9800' : '#FF9800',
            color: '#fff',
            '&:hover': {
              backgroundColor: darkMode ? '#FFA000' : '#FFA000',
            },
            minWidth: '80px',
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
