import React, { useState, useEffect } from 'react';
import HeaderShelter from '../../components/HeaderShelter';
import FooterShelter from '../../components/FooterShelter';
import ShelterApplicationDecision from '../../components/ShelterApplicationDecision';

const ShelterUpdateStatusPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <HeaderShelter />
                <ShelterApplicationDecision />
            <FooterShelter />
        </div>
    );
};

export default ShelterUpdateStatusPage;