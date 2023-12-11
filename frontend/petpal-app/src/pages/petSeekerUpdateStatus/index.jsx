import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PetSeekerApplicationDecision from '../../components/PetSeekerApplicationDecision';

const PetSeekerUpdateStatusPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
                <PetSeekerApplicationDecision />
            <Footer />
        </div>
    );
};

export default PetSeekerUpdateStatusPage;