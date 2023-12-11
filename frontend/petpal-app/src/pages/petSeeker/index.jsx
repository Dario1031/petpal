import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import HeaderShelter from '../../components/HeaderShelter';
import HeaderBasic from '../../components/HeaderBasic';
import Footer from '../../components/Footer';
import SeekerCard from '../../components/SeekerCard';

const PetSeekerPage = () => {
  const [petData, setPetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [sortOption, setSortOption] = useState('');
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        search: searchTerm,
        ordering: sortOption,
      });

      queryParams.append(filterOption, searchTerm);

      console.log(queryParams.toString());

      const response = await fetch(`http://127.0.0.1:8000/pets/list/?${queryParams.toString()}`, {
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
      setTotalPages(Math.ceil(data.count / 6));
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleSearch = async () => {
    setCurrentPage(1);
    console.log(searchTerm);
    fetchData();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (sortOption) => {
    setSortOption(sortOption);
    setCurrentPage(1);
    fetchData();
  };

  const handleFilter = (filterOption) => {
    setFilterOption(filterOption);
    setCurrentPage(1);
    fetchData();
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
          <h1 className="text-center">Take a look at some of our available pets!</h1>
        </div>
        <div className="row mb-3">
          <div className="input-group">
            <input type="search" className="form-control" placeholder="Search..." style={{ padding: "10px" }} aria-label="Search input" value={searchTerm} onChange={handleSearchChange} />
            <button type="button" className="btn btn-outline-secondary" onClick={handleSearch}>Search</button>
            <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#" onClick={() => handleFilter('shelter')}>Filter by: Shelter</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleFilter('is_adopted')}>Filter by: Availability</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleFilter('species')}>Filter by: Species</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleFilter('breed')}>Filter by: Breed</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleSort('name')}>Sort by: Name</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleSort('age')}>Sort by: Age</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          {petData.map((pet) => (
            <SeekerCard key={pet.id} data={pet} />
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
      <Footer />
    </div>
  );
};

export default PetSeekerPage;
