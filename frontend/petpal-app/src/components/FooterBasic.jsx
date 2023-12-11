import React from 'react';

const FooterBasic = () => {
  return (
    <footer className="footer mt-auto py-3">
        <ul className="nav justify-content-center pb-3 mb-3">
          <li className="nav-item"><a href={`/`} className="nav-link px-2 text-body-secondary">Sign Up</a></li>
          <li className="nav-item"><a href={`/login`} className="nav-link px-2 text-body-secondary">Log In</a></li>
          <li className="nav-item"><a href={`/petseeker`} className="nav-link px-2 text-body-secondary">Pet Seeker</a></li>
        </ul>
        <p className="text-center text-body-secondary">&copy; 2023 PetPal</p>
      </footer>
  );
};

export default FooterBasic;