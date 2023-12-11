import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PetSeekerApplications = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = localStorage.getItem("user");
    const username = String(JSON.parse(user).username);
    const userId = JSON.parse(user).id;

    const endpoint = `http://127.0.0.1:8000/applications/${userId}/petseeker/list/`;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(endpoint, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('authtoken')}`,},
            });
            const result = await response.json();
            console.log(result);

            // const filtered = result.results.filter((pet) => pet.pet_id === parseInt(petId));
            setFilteredData(result);

          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container col-xl-10 col-xxl-8 px-4 py-5">
            <div className="center-form form-box">
                {filteredData.map((input) => (
                    <form key={input.id} className="form-container" encType="multipart/form-data">
                        <div style={{ marginBottom: "5px" }} className="form-group">
                            <label htmlFor="username" className="label-box">Username</label>
                            <input type="text" className="form-control input-box" id="username" name="username" value={username} readOnly={true}/>
                        </div>
                        <div style={{ marginBottom: "5px" }} className="form-group">
                            <label htmlFor="application" className="label-box">Application ID</label>
                            <input type="text" className="form-control input-box" id="application" name="id" value={input.id} readOnly={true}/>
                        </div>
                        <div style={{ marginBottom: "5px" }} className="form-group">
                            <label htmlFor="bio" className="label-box">Why do you want this animal & relevant previous pet experience:</label>
                            <textarea className="form-control input-box" rows="4" id="bio" name="description" value={input.description} readOnly={true}></textarea>
                        </div>
                        <div style={{ marginBottom: "5px" }} className="form-group">
                            <label htmlFor="profilepic" className="label-box">Legal document upload (ID Check)</label>
                            <input type="file" className="form-control input-box" id="profilepic" name="legaldoc" value={input.legaldoc} readOnly={true}/>
                        </div>
                        <div style={{ marginBottom: "8px" }} className="form-group">
                            <label htmlFor="status" className="label-box">Status</label>
                            <input type="text" className="form-control input-box" id="status" name="status" value={input.status} readOnly={true}/>
                        </div>
                        <a style={{ marginBottom: "10px" }} href={`/petseekerupdate/${input.id}`} type="button" className="btn btn-primary">Update Status</a>
                    </form>
                ))}
            </div>
        </div>
    );  
};

export default PetSeekerApplications;