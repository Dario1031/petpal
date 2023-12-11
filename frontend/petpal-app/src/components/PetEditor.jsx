import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

const PetEditor = () => {

  const {petId} = useParams();
  const [pet, setPet] = useState('');
  const userString = localStorage.getItem('user');
  const shelter = JSON.parse(userString).id;
  console.log(shelter);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  // const [shelter, setShelter] = useState('');
  const [is_adopted, setAdopted] = useState(false);
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const authToken = localStorage.getItem('authtoken');
        const response = await fetch(`http://127.0.0.1:8000/pets/${petId}/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const petData = await response.json();
          setPet(petData);
          console.log(petData);
        } else {
          console.error('Failed to fetch pet info:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };
  
    fetchPetData();
  }, [petId]); // Include petId in the dependency array if it's coming from props or state
  

  const handlePetEdit = async () => {
    try {
      const formData = new FormData();
      const appendIfValue = (field, value) => {
        if (value !== '' && value !== null && value !== undefined) {
          if (field === 'age') {
            formData.append(field, String(value)); // Convert age to string
          } else {
            formData.append(field, value);
          }
        }
      };
  
      appendIfValue('name', name);
      appendIfValue('species', species);
      appendIfValue('gender', gender);
      appendIfValue('breed', breed);
      appendIfValue('age', age);
      appendIfValue('image', image);
      appendIfValue('shelter', pet.shelter);
      appendIfValue('is_adopted', is_adopted);
      appendIfValue('bio', bio);
  
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(`http://127.0.0.1:8000/pets/alteration/${petId}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
        // body: JSON.stringify({ name, species, breed, age, image, shelter }),
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Pet edited:', data);
        window.location.reload();
        // window.location.reload();
      } else {
        // Handle login error
        console.error('Creation failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during creation:', error.message);
    }
  };

  // const handleCheckboxChange = (e) => {
  //   // Handle checkbox changes and update the state
  //   setPetData({
  //     ...petData,
  //     [e.target.name]: e.target.checked,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Perform submission logic, e.g., send data to the backend
  //   console.log('Submitted data:', petData);
  // };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="center-form form-box">
        <form className="form-container">
          {!pet && (<div className="photo">
            <img src="https://www.dailypaws.com/thmb/70QPrCasQV2ZvnPz23CF6a3ce-E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/oriental-shorthair-head-shot-1337897765-22f03e982a814db2a5c9acc07479f6b0.jpg" alt="pet photo" width="150" height="150" className="rounded-circle" />
          </div>)}
          {pet && (<div className="photo">
            <img src={pet.image} alt="pet photo" width="150" height="150" className="rounded-circle" />
          </div>)}
          {/* <div className="photo">
            <img src="https://www.dailypaws.com/thmb/70QPrCasQV2ZvnPz23CF6a3ce-E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/oriental-shorthair-head-shot-1337897765-22f03e982a814db2a5c9acc07479f6b0.jpg" alt="pet photo" width="150" height="150" className="rounded-circle" />
          </div> */}
          <div className="form-group">
            <label htmlFor="profilepic" className="label-box">Profile Picture</label>
            <input type="file" className="form-control input-box" id="profilepic" name="profilepic" required onChange={(e) => setImage(e.target.files[0])}/>
          </div>
          <div className="form-group">
            <label htmlFor="username" className="label-box">Name</label>
            <input type="text" className="form-control input-box" id="petname" name="petname" placeholder={pet.name} required onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="species" className="label-box">Species</label>
            <input type="text" className="form-control input-box" id="species" name="species" placeholder={pet.species} required onChange={(e) => setSpecies(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="breed" className="label-box">Breed</label>
            <input type="text" className="form-control input-box" id="breed" name="breed" placeholder={pet.breed} required onChange={(e) => setBreed(e.target.value)}/>
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="age" className="col-sm-2 col-form-label">
              Age
            </label>
            <div className="input-group mb-3" id="age">
              <input type="number" className="form-control" id="inputAge" placeholder={pet.age} onChange={(e) => setAge(e.target.value)}/>
            </div>
          </div>
            <fieldset className="form-group col-md-6">
              <div className="row">
                <legend className="col-form-label col-sm-2 pt-0">Sex</legend>
                <div className="col-sm-10">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked onChange={(e) => setGender("Male")}/>
                    <label className="form-check-label" htmlFor="gridRadios1">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" onChange={(e) => setGender("Female")}/>
                    <label className="form-check-label" htmlFor="gridRadios2">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="form-check">
            <label className="form-check-label col-md-2" htmlFor="flexCheckDefault">
              Adopted
            </label>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => setAdopted(!is_adopted)}/>
          </div>
          <div className="form-group">
            <label htmlFor="bio" className="label-box">Biography</label>
            <textarea className="form-control input-box" placeholder={pet.bio} rows="4" id="bio" name="bio" required onChange={(e) => setBio(e.target.value)}></textarea>
          </div>
          <button className="btn btn-primary" type='button' style={{ marginRight: '5px', marginTop: '5px' }} onClick={handlePetEdit}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default PetEditor;