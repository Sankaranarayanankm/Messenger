import { Card, CardContent, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ username, message }, ref) => {
  if (!message) return null;
  // to check if the message is typed in by the logged in user then we want to display it diffrently
  const isLogin = username === message.username;

  return (
    <div ref={ref} className={`message ${isLogin && "message__user"}`}>
      <Card className={isLogin ? "message__userCard" : "message__guestCart"}>
        <CardContent>
          <Typography color="black" variant="h5" component="h2">
            {message.username}: {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
