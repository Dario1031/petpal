import React from 'react';
import Register from '../../components/Register';
import HeaderBasic from '../../components/HeaderBasic';
import FooterBasic from '../../components/FooterBasic';

const registerPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeaderBasic />
            <Register />
        <FooterBasic />
    </div>
  );
};

export default registerPage;