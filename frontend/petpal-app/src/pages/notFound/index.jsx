import React from 'react';
import Header from '../../components/Header';
import HeaderShelter from '../../components/HeaderShelter';
import HeaderBasic from '../../components/HeaderBasic';
import Footer from '../../components/Footer';

const notFoundPage = () => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {user.is_shelter && (
                  <HeaderShelter />
              )}
      {!user.is_shelter && (
                  <Header />
              )}
      {!user && (
                  <HeaderBasic />
              )}
        <h1>404 NOT FOUND</h1>
        <Footer />
    </div>
  );
};

export default notFoundPage;