import React from 'react';

const Message = ({ sender, content }) => {
  return (
    <div className="message_card d-flex flex-column p-3 mt-2" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
      <p>From: {sender}</p>
      <p>{content}</p>
    </div>
  );
};

export default Message;