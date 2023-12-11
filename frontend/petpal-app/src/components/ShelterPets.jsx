import React, { useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

const ShelterPet = ({data}) => {
  const { name, species, shelter, gender, breed, age, image, is_adopted, bio, id } = data;
  console.log(data);

  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
      <div className="card">
        <img src={image} className="card-img-top" alt="Card Image" style={{ width: "100%", height: "25vh", objectFit: "cover" }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text mb-4">{bio}</p>
          {/* <p className="card-text mb-4">{species}</p>
          <p className="card-text mb-4">{breed}</p> */}
          <a style={{ marginBottom: "5px" }} href={`/petapplications/${id}`}  className="btn btn-primary mt-auto align-self-start">View Applications</a>
          <a href={`/editpet/${id}`}  className="btn btn-primary mt-auto align-self-start">Edit Pet</a>
        </div>
      </div>
    </div>
  );
};

export default ShelterPet;