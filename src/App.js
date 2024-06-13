import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import Message from "./Components/Message";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "Sonny", text: "Hello" },
    { username: "Sankara", text: "this is lit" },
  ]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = prompt("Please enter your name!");
    setUserName(name);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input.length == 0) return;
    setMessages([...messages, { username:userName, text: input }]);
    setInput("");
  };
  console.log(messages);
  return (
    <div className="App">
      <h1>Welcome To Messenger</h1>
      <h2>Welcome {userName}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send message
          </Button>
        </FormControl>
      </form>
      {messages.map((message) => (
        <Message username={message.username} text={message.text} />
      ))}
    </div>
  );
};

export default App;
