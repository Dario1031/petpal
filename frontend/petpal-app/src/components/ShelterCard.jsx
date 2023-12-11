import React from 'react';
import { Link } from "react-router-dom";

const ShelterCard = ({data}) => {
  const { id, username, company, description, profile_img } = data;
  console.log(profile_img);

  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
                          <div className="card">
                          {!profile_img && (
                              <img src="https://i.pinimg.com/originals/fb/15/f0/fb15f07243e81de329a17151300b5e99.png" alt="Toronto Adoption Center Logo" style={{ width: "100%", height: "25vh", objectFit: "cover" }}/>
                          )}
                          {profile_img && (
                              <img src={profile_img} alt="Toronto Adoption Center Logo" style={{ width: "100%", height: "25vh", objectFit: "cover" }}/>
                          )}
                            <div className="card-body d-flex flex-column">
                              <h5 className="card-title">{company}</h5>
                              <p className="card-text mb-4">{description}</p>
                              {/* <button className="btn btn-primary mt-auto align-self-start" data-bs-toggle="modal" data-bs-target="#exampleModal">Go to Shelter Page</button>       */}
                              <Link className="btn btn-primary mt-auto align-self-start" to ={`/shelter/${id}`}>Go to Shelter Page</Link>                           
                            </div>
                          </div>
                        </div>
  );
};

export default ShelterCard;