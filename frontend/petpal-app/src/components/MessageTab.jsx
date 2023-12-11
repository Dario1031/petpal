import React from 'react';
import { Link } from "react-router-dom";

const MessageTab = ({ partner }) => {
  return (
    <div className="message_card d-flex flex-column p-3 mt-2" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
      <h1>{partner}</h1>
      <Link className="w-100 btn btn-lg btn-primary" to={`/chat/${partner}`}>Go To Chat</Link>
    </div>
  );
};

export default MessageTab;