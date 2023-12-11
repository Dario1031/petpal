import React from 'react';
import Login from '../../components/Login';
import HeaderBasic from '../../components/HeaderBasic';
import FooterBasic from '../../components/FooterBasic';

const loginPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeaderBasic />
            <Login />
        <FooterBasic />
    </div>
  );
};

export default loginPage;