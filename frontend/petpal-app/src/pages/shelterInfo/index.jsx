import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import HeaderShelter from '../../components/HeaderShelter';
import HeaderBasic from '../../components/HeaderBasic';
import Footer from '../../components/Footer';
import ShelterInfo from '../../components/ShelterInfo';
import ReviewsList from '../../components/CommentList';

const ShelterInfoPage = () => {
  const [history, setHistory] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const { shelterId } = useParams();
  const shelterIdInt = parseInt(shelterId, 10);
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  console.log(shelterIdInt)

  useEffect(() => {
    const fetchMessageHistory = async () => {
      try {
        const authToken = localStorage.getItem('authtoken');
        const response = await fetch(`http://127.0.0.1:8000/reviews/${shelterIdInt}/id/list/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const historyData = await response.json();
          setHistory(historyData || []);
          console.log(history)
        } else {
          setHistory([]);
          console.error('Failed to fetch chat history:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    fetchMessageHistory();
  }, [shelterId]); // Empty dependency array ensures the effect runs once on mount

  if (!history) {
    // You can render a loading state here if needed
    return <div>Loading...</div>;
  }

  const createReview = async () => {
    try {
      const authToken = localStorage.getItem('authtoken');
      const response = await fetch(`http://127.0.0.1:8000/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ reviewer: user.id, shelter: shelterIdInt, content: reviewText, rating: rating }),
      });

      if (response.ok) {
        // Handle successful response (e.g., show a modal)
        console.log('Message sent successfully');
        window.location.reload();
      } else {
        // Handle error response (e.g., show an error message)
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error during message sending:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {user.is_shelter && (
                  <HeaderShelter />
              )}
      {!user.is_shelter && (
                  <Header />
              )}
      {!user && (
                  <HeaderBasic />
              )}
            <ShelterInfo />
            <h1>Leave a Review!</h1>
            <div className="center-form form-box px-4 py-5 text-center">
  <form className="form-container" encType="multipart/form-data">
    <div className="form-group">
      <label className="label-box">Rating: </label>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={() => setRating(1)}/>
        <label className="form-check-label" htmlFor="inlineRadio1">1</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={() => setRating(2)}/>
        <label className="form-check-label" htmlFor="inlineRadio2">2</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" onChange={() => setRating(3)}/>
        <label className="form-check-label" htmlFor="inlineRadio3">3</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4" onChange={() => setRating(4)}/>
        <label className="form-check-label" htmlFor="inlineRadio3">4</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="option5" onChange={() => setRating(5)}/>
        <label className="form-check-label" htmlFor="inlineRadio5">5</label>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="review" className="label-box">Review</label>
      <textarea className="form-control input-box" placeholder="Type your review here" rows="6" id="review" name="review" onChange={(e) => setReviewText(e.target.value)}></textarea>
    </div>
    <a className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#StatusModal">Submit</a>
    <div className="modal fade" id="StatusModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Review</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={createReview}></button>
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
          <h1>Reviews</h1>

            <ReviewsList messages={history.results}/>
        <Footer />
    </div>
  );
};

export default ShelterInfoPage;