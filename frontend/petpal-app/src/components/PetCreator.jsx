import React, { useState } from 'react';

const PetCreator = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState('');
  const is_adopted = false;
  const userString = localStorage.getItem("user");
  const shelter = JSON.parse(userString).id;

  const handlePetCreation = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('species', species);
      formData.append('breed', breed);
      formData.append('gender', sex);
      formData.append('age', age);
      formData.append('image', image);
      formData.append('bio', bio);
      formData.append('shelter', shelter);
      formData.append('is_adopted', is_adopted);
      const response = await fetch('http://127.0.0.1:8000/pets/creation/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
        // body: JSON.stringify({ name, species, breed, age, image, shelter }),
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(formData);
        console.log('Pet created:', data);
      } else {
        // Handle login error
        console.error('Creation failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during creation:', error.message);
    }
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="center-form form-box">
        <form className="form-container" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="profilepic" className="label-box">
              Profile Picture
            </label>
            <input
              type="file"
              className="form-control input-box"
              id="profilepic"
              name="profilepic"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="petname" className="label-box">
              Name
            </label>
            <input
              type="text"
              className="form-control input-box"
              id="petname"
              name="petname"
              placeholder="Doge"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label-box">
              Species
            </label>
            <input
              type="text"
              className="form-control input-box"
              id="email"
              name="email"
              placeholder="Cat"
              required
              onChange={(e) => setSpecies(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label-box">
              Breed
            </label>
            <input
              type="text"
              className="form-control input-box"
              id="email"
              name="email"
              placeholder="Oriental"
              required
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>
          <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="age" className="col-sm-2 col-form-label">
              Age
            </label>
            <div className="input-group mb-3" id="age">
              <input type="number" className="form-control" id="inputAge" placeholder="Enter your pet's age" onChange={(e) => setAge(e.target.value)}/>
            </div>
          </div>
            <fieldset className="form-group col-md-6">
              <div className="row">
                <legend className="col-form-label col-sm-2 pt-0">Sex</legend>
                <div className="col-sm-10">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="option1"
                      onChange={() => setSex("Male")}
                    />
                    <label className="form-check-label" htmlFor="gridRadios1">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="option2"
                      onChange={() => setSex("Female")}
                    />
                    <label className="form-check-label" htmlFor="gridRadios2">
                      Female
                    </label>
                  </div>
                  {/* Add more options if needed */}
                </div>
              </div>
            </fieldset>
          </div>
          <div className="form-group">
            <label htmlFor="bio" className="label-box">
              Biography
            </label>
            <textarea
              className="form-control input-box"
              placeholder="My name is Joseph but you can all me Joe, I like dogs ..."
              rows="4"
              id="bio"
              name="bio"
              required
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <button style={{ marginTop: '5px' }} type="button" className="btn btn-primary" onClick={handlePetCreation}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );  
};

export default PetCreator;
