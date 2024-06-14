import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "./Message.css";

const Message = ({ username, message }) => {
  // const {username,text}=props.message;
  // to check if the message is typed in by the logged in user then we want to display it diffrently
  const isLogin = username===message.username;
  console.log(username,message)
  return (
    <div className={`message ${isLogin && "message__user"}`}>
      <Card className={isLogin ? "message__userCard" : "message__guestCart"}>
        <CardContent>
          <Typography color="black" variant="h5" component="h2">
            {message.username}: {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Message;
