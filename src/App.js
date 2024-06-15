import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import {
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import Message from "./Component/Message";
import db from "./firebase";
import FlipMove from "react-flip-move";
import logo from "./assets/facebook-messenger.svg";
import "./App.css";
const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
      );
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const name = prompt("Please enter your name!");
    setUserName(name);
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (input.length === 0) return;
    try {
      await addDoc(collection(db, "messages"), {
        message: input,
        username: userName,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }

    setInput("");
  };

  return (
    <div className="app">
      <img src={logo} alt="Messenger Logo" />
      <h1>Welcome To Messenger</h1>
      <h2>Welcome {userName}</h2>
      <form className="app__form" onSubmit={sendMessage}>
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
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={userName} message={message} />
        ))}
      </FlipMove>
    </div>
  );
};

export default App;
