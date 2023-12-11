import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBasic = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
    <div className="container-fluid">
    <Link className="navbar-brand" to="/petseeker"><img src="https://png.pngtree.com/png-clipart/20230308/ourmid/pngtree-cartoon-dog-puppy-sticker-cute-png-image_6629416.png" width="50" alt="logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href={`/petseeker`}>Pet Seeker</a>
            </li>
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-lg-center row-gap-3">
            <li className="nav-item">
            <Link to="/" className="btn px-3" role="button">Sign Up</Link>
            </li>
        </ul>
        </div>
    </div>
    </nav>
  );
};

export default HeaderBasic;