import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="index.html">
          <img src="https://png.pngtree.com/png-clipart/20230308/ourmid/pngtree-cartoon-dog-puppy-sticker-cute-png-image_6629416.png" width="50" alt="logo" />
        </a> */}
        <Link className="navbar-brand" to="/petseeker"><img src="https://png.pngtree.com/png-clipart/20230308/ourmid/pngtree-cartoon-dog-puppy-sticker-cute-png-image_6629416.png" width="50" alt="logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to ="/petseeker">Pet Seeker</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to ="/shelterlist">Shelters</Link>
                </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to ="/myapplications">My Applications</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to ="/chats">Messages</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-lg-center row-gap-3">
            <li className="nav-item">
            {!user.profile_img && (
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle caret-off px-lg-4"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
                    alt="user-avatar"
                    width="50"
                    height="50"
                    className="rounded-circle"
                    style={{ maxWidth: '50px', maxHeight: '50px' }}
                  />
                </a>
              )}
              {user.profile_img && (
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle caret-off px-lg-4"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={user.profile_img} alt="user-avatar" style={{ maxWidth: '50px', maxHeight: '50px' }} className='rounded-circle'/>
                </a>
              )}
              <ul className="dropdown-menu text-small dropdown-menu-end mx-lg-2">
                {/* <li><a className="dropdown-item" href="#">View Profile</a></li> */}
                <Link className="dropdown-item" to ="/profile">Edit Profile</Link>
                {/* <li><a className="dropdown-item" href="user_profile.html">Edit Profile</a></li> */}
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href={`/`}>Sign out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;