import React, { useState } from 'react';

const Comments = ({author, text, rating}) => {

  return (
    <div className="px-4 py-3 my-5">
                <h1 className="display-7 fw-bold text-body-emphasis">{author}</h1>
                <img src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg" alt="" width="75" height="75" className="rounded-circle" />
                {/* <h2>{author}</h2> */}
                <div className="mx-auto">
                  <p className="lead mb-4">{text}</p>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-left">
                  <p className="lead mb-3">Rating: {rating}/5</p>
                  </div>
                </div>
              </div>
  );
};

export default Comments;