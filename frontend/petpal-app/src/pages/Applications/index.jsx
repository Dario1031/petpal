import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ApplicationCard from '../../components/ApplicationCard';

const ApplicationsPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <div class="container mt-4">
          <div class="row">
            <h1 class="text-center">List of Your Applications</h1>
          </div>
          <div class="row">
            <ApplicationCard />
            <ApplicationCard />
            <ApplicationCard />
          </div>
        </div>
        <Footer />
    </div>
  );
};

export default ApplicationsPage;