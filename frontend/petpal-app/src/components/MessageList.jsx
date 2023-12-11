import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages && messages.map((message, index) => (
        <Message key={index} sender={message.sender} content={message.content} />
      ))}
    </div>
  );
};

export default MessageList;