import React, { useState, useEffect } from 'react';
import HeaderShelter from '../../components/HeaderShelter';
import FooterShelter from '../../components/FooterShelter';
import ShelterPet from '../../components/ShelterPets';

const ShelterPetsPage = () => {
  const [petData, setPetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/pets/list/?page=${currentPage}`, {
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
        setPetData(data.results);
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

  const user = localStorage.getItem("user");
  const userId = JSON.parse(user).id;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderShelter />
      <div className="container mt-4">
        <div className="row">
          <h1 className="text-center">Pets In Your Shelter</h1>
        </div>
        <div className="row">
          {petData
            .filter((pet) => pet.shelter === userId)
            .map((pet) => (
                <ShelterPet key={pet.id} data={pet} />
            ))}
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
      </div>
      <FooterShelter />
    </div>
  );
};

export default ShelterPetsPage;