import React from 'react';
import Comments from './Comments';

const ReviewsList = ({ messages }) => {
  return (
    <div>
      {messages && messages.map((message, index) => (
        <Comments key={index} author={message.reviewer_username} text={message.content} rating={message.rating}/>
      ))}
    </div>
  );
};

export default ReviewsList;