import React, { useState, useEffect } from 'react';
import HeaderShelter from '../../components/HeaderShelter';
import FooterShelter from '../../components/FooterShelter';
import ShelterApplications from '../../components/ShelterApplications';

const ShelterApplicationsPage= () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <HeaderShelter />
                <ShelterApplications />
            <FooterShelter />
        </div>
    );
};

export default ShelterApplicationsPage;