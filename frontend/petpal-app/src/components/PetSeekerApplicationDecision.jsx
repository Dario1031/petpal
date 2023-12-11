import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PetSeekerApplicationDecision = () => {
    const user = localStorage.getItem("user");
    const userId = JSON.parse(user).id;
    const { appId } = useParams();
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [formData, setFormData] = useState({
        status: 'Pending',
    });

    const handleWithdrawn = () => {
        formData.status = 'Withdrawn';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const endpoint = `http://127.0.0.1:8000/applications/${userId}/${appId}/petseeker/alteration/`;
        // const token = `Bearer ${localStorage.getItem('authtoken')}`;
    
        const formDataToSend = new FormData();
        formDataToSend.append('status', formData.status);
    
        try {
          const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
            },
            body: formDataToSend,
          });
    
          if (response.ok) {
            // Handle success, e.g., show a success modal
            setSubmissionStatus('success');
            console.log('Status updated');
          } else {
            // Handle errors, e.g., show an error message
            setSubmissionStatus('error');
            console.error('Error updating status');
          }
        } catch (error) {
          setSubmissionStatus('error');
          console.error('Error:', error);
        }
      };
    
    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="center-form form-box">
                <h1 style={{ marginBottom: "5px" }} >Update Status for Application ID {appId}:</h1>
                <form className="form-container" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "5px" }} className="form-group">
                        <label htmlFor="application" className="label-box">Application ID</label>
                        <input type="text" className="form-control input-box" id="application" name="id" value={appId} readOnly={true}/>
                    </div>
                    <button style={{ marginBottom: "10px" }} type="submit" className="btn btn-primary" onClick={handleWithdrawn}>Withdraw</button>
                    {submissionStatus === 'success' && (
                    <div className="alert alert-success" role="alert"> Status Updated </div>
                    )}
                    {submissionStatus === 'error' && (
                    <div className="alert alert-danger" role="alert"> Error Updating Status. Please try again. </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PetSeekerApplicationDecision;