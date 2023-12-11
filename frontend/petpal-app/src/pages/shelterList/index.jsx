import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import HeaderShelter from '../../components/HeaderShelter';
import HeaderBasic from '../../components/HeaderBasic';
import Footer from '../../components/Footer';
import ShelterCard from '../../components/ShelterCard';

const ShelterCardPage = () => {
  const [shelterData, setShelterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/accounts/list/?page=${currentPage}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Error fetching pet data:', response.statusText);
          return;
        }

        const data = await response.json();
        setShelterData(data.results);
        console.log(data.results);
        console.log("shelterData set");
        setTotalPages(Math.ceil(data.count / 5)); // Assuming 5 items per page
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
    <div className="container mt-4">
          <div className="row">
            <h1 className="text-center">List of All Shelters</h1>
          </div>
          <div className="row">
          {shelterData.map((shelter) => (
            <ShelterCard key={shelter.id} data={shelter} />
          ))}
          </div>
        </div>
        <div className="row mt-3">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              {[...Array(totalPages).keys()].map((page) => (
                <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Footer />
    </div>
  );
};

export default ShelterCardPage;