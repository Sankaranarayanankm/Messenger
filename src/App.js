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
// import firebase from 'firebase';
import db from "./firebase";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
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
    <div className="App">
      <h1>Welcome To Messenger</h1>
      <h2>Welcome {userName}</h2>
      <form onSubmit={sendMessage}>
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

// useEffect(() => {
// getting data from fire base when the page loads
//

//   const fetchData = async () => {
//     // const q= query(
//     //   collection(db, "messages"),
//     //   orderBy("timestamp", "asc")
//     // );
//     const querySnapshot = await getDocs(collection(db, "messages"));
//     const messagesData = querySnapshot.docs.map((doc) => ({
//       ...doc.data(),
//     }));
//     setMessages(messagesData);
//   };

//   fetchData();
// }, []);

// adding data to the firestore
// try {
//   const docs = await addDoc(collection(db, "messages"), {
//     message: input,
//     username: userName,
//     timestamp: serverTimestamp(), // error here  undefiled field value
//   });
//   console.log(docs);
// } catch (error) {
//   console.log(error);
// }
