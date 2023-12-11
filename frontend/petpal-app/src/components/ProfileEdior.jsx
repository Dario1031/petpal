import React, { useState, useEffect } from 'react';

const ProfileEditor = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [insta, setInsta] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const is = user.is_shelter;

  const handleProfileEdit = async () => {
    try {
      const formData = new FormData();
      const appendIfValue = (field, value) => {
        if (value !== '' && value !== null && value !== undefined) {
          formData.append(field, value);
        }
      };
  
      appendIfValue('username', username);
      appendIfValue('password', password);
      appendIfValue('email', email);
      appendIfValue('first_name', firstname);
      appendIfValue('last_name', lastname);
      appendIfValue('profile_img', image);
      appendIfValue('description', bio);
      appendIfValue('company', company);
      appendIfValue('address', address);
      appendIfValue('city', city);
      appendIfValue('province', province);
      appendIfValue('country', country);
      appendIfValue('phone', phone);
      appendIfValue('website', website);
      appendIfValue('instagram', insta);
      appendIfValue('twitter', twitter);
      appendIfValue('facebook', facebook);
      appendIfValue('is_shelter', is);
  
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch('http://127.0.0.1:8000/accounts/alteration/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
        // body: JSON.stringify({ name, species, breed, age, image, shelter }),
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User edited:', data);
        localStorage.setItem('user', JSON.stringify(data));
        window.location.reload();
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
        <label htmlFor="username" className="label-box">Username</label>
        <input type="text" className="form-control input-box" id="username" name="username" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor="password" className="label-box">Password</label>
        <input type="password" className="form-control input-box" id="password" name="password" placeholder="Enter New Password" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor="email" className="label-box">Email</label>
        <input type="email" className="form-control input-box" id="email" name="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor="firstname" className="label-box">First Name</label>
        <input type="text" className="form-control input-box" id="firstname" name="firstname" placeholder={user.first_name} onChange={(e) => setFirstName(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor="lastname" className="label-box">Last Name</label>
        <input type="text" className="form-control input-box" id="lastname" name="lastname" placeholder={user.last_name} onChange={(e) => setLastName(e.target.value)}/>
      </div>
      {!user.is_shelter && (
        <div className="form-group">
          <label htmlFor="profilepic" className="label-box">Profile Picture</label>
          <input type="file" className="form-control input-box" id="profilepic" name="profilepic" onChange={(e) => setImage(e.target.files[0])}/>
      </div>
      )}
      {user.is_shelter && (
        <div className="form-group">
          <label htmlFor="profilepic" className="label-box">Logo</label>
          <input type="file" className="form-control input-box" id="profilepic" name="profilepic" onChange={(e) => setImage(e.target.files[0])}/>
      </div>
      )}
      
      <div className="form-group">
        <label htmlFor="bio" className="label-box">Biography</label>
        <textarea className="form-control input-box" placeholder="Enter your bio here ..." rows="4" id="bio" name="bio" onChange={(e) => setBio(e.target.value)}></textarea>
      </div>
      {user.is_shelter && (
                  <div className="form-group">
                    <label htmlFor="company" className="label-box">Company</label>
                    <input type="text" className="form-control input-box" id="company" name="company" placeholder={user.company} onChange={(e) => setCompany(e.target.value)}/>
                  </div>
      )}
      {user.is_shelter && (
                  <div className="form-group">
                    <label htmlFor="address" className="label-box">Address</label>
                    <input type="text" className="form-control input-box" id="address" name="address" placeholder={user.address} onChange={(e) => setAddress(e.target.value)}/>
                  </div>
      )}
      {user.is_shelter && (
                  <div className="form-group">
                    <label htmlFor="city" className="label-box">City</label>
                    <input type="text" className="form-control input-box" id="city" name="city" placeholder={user.city} onChange={(e) => setCity(e.target.value)}/>
                  </div>
      )}
      {user.is_shelter && (
                  <div className="form-group">
                    <label htmlFor="province" className="label-box">Province</label>
                    <input type="text" className="form-control input-box" id="province" name="province" placeholder={user.province} onChange={(e) => setProvince(e.target.value)}/>
                  </div>
      )}
      {user.is_shelter && (
                  <div className="form-group">
                    <label htmlFor="country" className="label-box">Country</label>
                    <input type="text" className="form-control input-box" id="country" name="country" placeholder={user.country} onChange={(e) => setCountry(e.target.value)}/>
                  </div>
      )}
      {user.is_shelter && (
                  <div className="form-group">
                  <label htmlFor="phone" className="label-box">Phone Number</label>
                  <input type="text" className="form-control input-box" id="phone" name="phone" placeholder={user.phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
      )}
      {user.is_shelter && (
                  <div className="form-group">
                  <label htmlFor="site" className="label-box">Website</label>
                  <input type="text" className="form-control input-box" id="site" name="phone" placeholder={user.website} onChange={(e) => setWebsite(e.target.value)}/>
                </div>
      )}
      {user.is_shelter && (
                  <div className="form-group">
                  <label htmlFor="insta" className="label-box">Instagram</label>
                  <input type="text" className="form-control input-box" id="insta" name="phone" placeholder={user.instagram} onChange={(e) => setInsta(e.target.value)}/>
                </div>
      )}
      {user.is_shelter && (
                  <div className="form-group">
                  <label htmlFor="twitter" className="label-box">Twitter</label>
                  <input type="text" className="form-control input-box" id="twitter" name="phone" placeholder={user.twitter} onChange={(e) => setTwitter(e.target.value)}/>
                </div>
      )}
      {user.is_shelter && (
                  <div className="form-group">
                  <label htmlFor="facebook" className="label-box">Facebook</label>
                  <input type="text" className="form-control input-box" id="facebook" name="phone" placeholder={user.facebook} onChange={(e) => setFacebook(e.target.value)}/>
                </div>
      )}
      <button className="btn btn-primary" type='button' style={{ marginRight: '5px', marginTop: '5px' }} onClick={handleProfileEdit}>Save</button>
      {/* <div className="modal fade" id="StatusModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul>
                <li className="font-color-green">Save Successful: your changes have been made</li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </form>
  </div>
</div>
  );
};

export default ProfileEditor;