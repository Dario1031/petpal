import React, { useState } from 'react';

const Review = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
// //   const [is_shelter, setShelter] = useState('');

//   const handleLogin = () => {
//     // Handle login logic here (e.g., API call to your Django backend)
//     console.log('Creating User with:', { username, password });
//   };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="heading-container">
        <h1 className="heading">Write Review</h1>
    </div>
    <div className="center-form form-box">
        <form className="form-container" encType="multipart/form-data">
        <div className="form-group">
            <label className="label-box">Rating: </label>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
            <label className="form-check-label" htmlFor="inlineRadio1">1</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
            <label className="form-check-label" htmlFor="inlineRadio2">2</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
            <label className="form-check-label" htmlFor="inlineRadio3">3</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4" />
            <label className="form-check-label" htmlFor="inlineRadio3">4</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="option5" />
            <label className="form-check-label" htmlFor="inlineRadio5">5</label>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="review" className="label-box">Review</label>
            <textarea className="form-control input-box" placeholder="Type your review here" rows="6" id="review" name="review"></textarea>
        </div>
        <a className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#StatusModal">Submit</a>
        <div className="modal fade" id="StatusModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Review</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <ul>
                    <li className="font-color-green">Review Submitted</li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </form>
    </div>
    </div>
  );
};

export default Review;