import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PetSeekerApplications from '../../components/PetSeekerApplications';

const PetSeekerApplicationsPage= () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
                <PetSeekerApplications />
            <Footer />
        </div>
    );
};

export default PetSeekerApplicationsPage;