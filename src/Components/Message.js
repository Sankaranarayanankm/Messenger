import React from "react";

const Message = (props) => {
  return (
    <div>
      <h2> {props.username}: {props.text}</h2>
    </div>
  );
};

export default Message;
