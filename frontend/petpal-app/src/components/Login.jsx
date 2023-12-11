import React, { useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('authtoken', data['access']);
        navigate('/petseeker');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
    try {
      const userResponse = await fetch('http://127.0.0.1:8000/accounts/activeuser/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        console.log('User fetched successfully:', userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        console.error('Failed to fetch user:', userResponse.statusText);
      }
    } catch (error) {
      console.error('Error during user fetch:', error.message);
    }
  };

  return (
    <div>
      {/* Sign in bootstrap code */}
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 custom-login">
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
              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="button" onClick={handleLogin}>
                Log In
              </button>
              <hr className="my-4" />

              <Link className="log-in-text" to="/">
                Don't have an account? Sign up here
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;