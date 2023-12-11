import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Application from '../../components/Application';

const petApplyPage= () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
                <Application />
            <Footer />
        </div>
    );
};

export default petApplyPage;