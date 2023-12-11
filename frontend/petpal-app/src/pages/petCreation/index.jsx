import React from 'react';
import Login from '../../components/Login';
import HeaderShelter from '../../components/HeaderShelter';
import FooterShelter from '../../components/FooterShelter';
import PetCreator from '../../components/PetCreator';

const petCreationPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <HeaderShelter />
            <PetCreator />
        <FooterShelter />
    </div>
  );
};

export default petCreationPage;