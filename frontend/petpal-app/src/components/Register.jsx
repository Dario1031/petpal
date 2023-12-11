import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('petseeker');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [phone_number, setPhone] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/accounts/${userType}/creation/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, company, address, city, province, country, phone_number}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Register successful:', data);
        navigate("/login");
      } else {
        console.error('Register failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Welcome to PetPal!</h1>
            <p className="col-lg-10 fs-4">
              PetPal is a pet adoption service matching loveable pets to their permanent homes. Ready to meet your new friend? Start your search now!
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 custom-login">
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
              <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Full Name" required />
                <label htmlFor="floatingInput">Full Name</label>
              </div>
              <div className="form-floating mb-3">
              <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                <label htmlFor="floatingPassword">Confirm Password</label>
              </div>
              {userType === 'shelter' && (
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="petType" placeholder="Company" required onChange={(e) => setCompany(e.target.value)}/>
                    <label htmlFor="petType">Company</label>
                  </div>
              )}
              {userType === 'shelter' && (
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="petType" placeholder="Address" required onChange={(e) => setAddress(e.target.value)}/>
                    <label htmlFor="petType">Address</label>
                  </div>
              )}
              {userType === 'shelter' && (
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="petType" placeholder="City" required onChange={(e) => setCity(e.target.value)}/>
                    <label htmlFor="petType">City</label>
                  </div>
              )}
              {userType === 'shelter' && (
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="petType" placeholder="Province" required onChange={(e) => setProvince(e.target.value)}/>
                    <label htmlFor="petType">Province</label>
                  </div>
              )}
              {userType === 'shelter' && (
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="petType" placeholder="Country" required onChange={(e) => setCountry(e.target.value)}/>
                    <label htmlFor="petType">Country</label>
                  </div>
              )}
              {userType === 'shelter' && (
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="petType" placeholder="Phone" required onChange={(e) => setPhone(e.target.value)}/>
                    <label htmlFor="petType">Phone</label>
                  </div>
              )}
              <div className="radio mb-3">
                <label style={{ marginRight: '5px' }}>
                  <input name="radio" type="radio" value="pet_seeker" onChange={() => setUserType('petseeker')}/> Pet Seeker
                </label>
                <label>
                  <input name="radio" type="radio" value="shelter" onChange={() => setUserType('shelter')}/> Shelter
                </label>
              </div>
              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="button" onClick={handleRegister}>
                Register
              </button>
              <hr className="my-4" />
              <Link className="log-in-text" to="/login">Already have an account? Log in here</Link>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Register;