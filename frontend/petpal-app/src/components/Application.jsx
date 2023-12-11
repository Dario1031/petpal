import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Application = () => {
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user).id;
  const username = String(JSON.parse(user).username);
  const { petId } = useParams();

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const [formData, setFormData] = useState({
    username: username,
    description: '',
    status: 'Pending',
    user_id: userId,
    pet_id: petId,
    legaldoc: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `http://127.0.0.1:8000/applications/${userId}/petseeker/creation/`;
    // const token = `Bearer ${localStorage.getItem('authtoken')}`;

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('user_id', formData.user_id);
    formDataToSend.append('pet_id', formData.pet_id);
    formDataToSend.append('legaldoc', formData.legaldoc);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        // Handle success, e.g., show a success modal
        setSubmissionStatus('success');
        console.log('Application submitted successfully');
        for (const pair of formDataToSend.entries()) {
          console.log(pair[0], pair[1]);
        }
      } else {
        // Handle errors, e.g., show an error message
        setSubmissionStatus('error');
        console.error('Error submitting application');
      }
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error:', error);
    }
  };



  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="center-form form-box">
                        <form className="form-container" encType="multipart/form-data" onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "5px" }} className="form-group">
                                <label htmlFor="username" className="label-box">Username</label>
                                <input type="text" className="form-control input-box" id="username" name="username" value={username} readOnly={true}/>
                            </div>
                            <div style={{ marginBottom: "5px" }} className="form-group">
                                <label htmlFor="bio" className="label-box">Why do you want this animal & relevant previous pet experience:</label>
                                <textarea className="form-control input-box" placeholder="I've owned a cat before..." rows="4" id="bio" name="description" onChange={handleInputChange} value={formData.description}></textarea>
                            </div>
                            <div style={{ marginBottom: "8px" }} className="form-group">
                                <label htmlFor="profilepic" className="label-box">Legal document upload (ID Check)</label>
                                <input type="file" className="form-control input-box" id="profilepic" name="legaldoc" onChange={handleInputChange}/>
                            </div>
                            <button style={{ marginBottom: "10px" }} type="submit" className="btn btn-primary" href="reset_password.html">Send Application!</button>
                            {submissionStatus === 'success' && (
                            <div className="alert alert-success" role="alert"> Application submitted successfully! </div>
                            )}
                            {submissionStatus === 'error' && (
                            <div className="alert alert-danger" role="alert"> Error submitting application. Please try again. </div>
                            )}
                        </form>
                    </div>
                  </div>
  );
};

export default Application;