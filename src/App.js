import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Message from "./Components/Message";
import db from "./firebase";
import "./App.css";
import firebase from "firebase/compat/app";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");

  // getting data from fire base when the page loads
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const messagesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setMessages(messagesData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const name = prompt("Please enter your name!");
    setUserName(name);
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (input.length === 0) return;
    // adding data to the firestore
    try {
       await addDoc(
        collection(db, "messages"), {
          message: input,
          username: userName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }
      );
      // console.log(docs);
    } catch (error) {
      console.log(error);
    }
    setInput("");
  };

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
        <Message username={userName} message={message} />
      ))}
    </div>
  );
};

export default App;
