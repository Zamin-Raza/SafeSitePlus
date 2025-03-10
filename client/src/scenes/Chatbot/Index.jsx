import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      setMessages([...messages, { text: input, sender: "user" }, { text: data.gemini_response, sender: "bot" }]);
    } catch {
      setMessages([...messages, { text: input, sender: "user" }, { text: "Error, try again.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 6, bgcolor: "rgba(255,255,255,0.3)", borderRadius: 2, boxShadow: 3, maxWidth: 1000, margin: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold", mb: 3 }}>
        Chatbot
      </Typography>

      <Paper sx={{ height: 400, overflowY: "auto", p: 2, mb: 2, bgcolor: "background.paper", borderRadius: 2 }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} sx={{ justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}>
              <Box sx={{ p: 2, bgcolor: message.sender === "user" ? "#D3183D" : "#f0f0f0", color: message.sender === "user" ? "white" : "black", borderRadius: 2, maxWidth: "70%" }}>
                <ListItemText primary={message.text} />
              </Box>
            </ListItem>
          ))}
          {isLoading && (
            <ListItem sx={{ justifyContent: "flex-start" }}>
              <Box sx={{ p: 2, bgcolor: "#f0f0f0", borderRadius: 2, maxWidth: "70%" }}>
                <ListItemText primary="Typing..." />
              </Box>
            </ListItem>
          )}
        </List>
      </Paper>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField fullWidth variant="outlined" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} sx={{ bgcolor: "background.paper", borderRadius: 2 }} />
        <Button variant="contained" onClick={handleSendMessage} disabled={isLoading || !input.trim()} sx={{ borderRadius: 2, px: 4, py: 2, bgcolor: "#D3183D", "&:hover": { bgcolor: "#B3122E" } }}>
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
