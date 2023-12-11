import React, { useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

const SeekerCard = ({data}) => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const is = user.is_shelter;
  const { name, species, shelter, gender, breed, age, image, is_adopted, bio, id } = data;
  console.log(data);

  return (
    <div className="col-lg-4 mb-3 d-flex align-items-stretch">
      <div className="card">
        <img src={image} className="card-img-top" alt="Card Image" style={{ width: "100%", height: "25vh", objectFit: "cover" }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <ul>
            <li>Species: {species}</li>
            <li>Breed: {breed}</li>
            <li>Age: {age}</li>
            <li>Sex: {gender}</li>
            <li style={{ color: is_adopted ? 'red' : 'green' }}>
              {is_adopted ? 'Adopted' : 'Available'}
            </li>
          </ul>
          <p className="card-text mb-4">{bio}</p>
          {!is_adopted && (
            <Link to={`/apply/${id}`} type="button" className="btn btn-secondary">
              Apply for me!
            </Link>
          )}
          {/* <a style={{ marginTop: "5px" }} className="btn btn-secondary" href={`/shelter/${shelter}`}>View Shelter</a> */}
          <Link style={{ marginTop: "5px" }} className="btn btn-secondary" to={`/shelter/${shelter}`}>View Shelter</Link>
        </div>
      </div>
    </div>
  );
};

export default SeekerCard;