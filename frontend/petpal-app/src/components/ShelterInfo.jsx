import React, { useEffect, useState } from 'react';
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram, BsWind } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { BsWindow } from "react-icons/bs";
import { useParams, Link } from 'react-router-dom';

const ShelterInfo = () => {
  const { shelterId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem('authtoken');
        const response = await fetch(`http://127.0.0.1:8000/accounts/${shelterId}/info/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user info:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    fetchUserInfo();
  }, []); // Empty dependency array ensures the effect runs once on mount

  if (!user) {
    // You can render a loading state here if needed
    return <div>Loading...</div>;
  }

  const address = encodeURIComponent(user.address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDRXcHDGj6Lb8G_5qt7BA1aNSYsJGYDMX0
  &q=${address}`;
  console.log(user);

  return (
    <div className="container">
    <div className="px-4 py-5 text-center">
      <h1 className="display-3 fw-bold text-body-emphasis">{user.company}</h1>
      {user === null && (
        <img
          src={user.profile_img}
          width="98"
          height="75"
         
        />
      )}
      {user !== null && (
        <img
          src={user.profile_img}
          width="98"
          height="75"
          alt="Toronto Adoption Center Logo"
        />
      )}
      <div className="col-lg-6 mx-auto">
      <p className="lead mb-4 fst-italic">Bringing Hearts Together: Where Unconditional Love Finds a Forever Home.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <p><a className="btn btn-lg btn-primary" href="create_review.html">Leave a Review</a></p>
        </div>
      </div>
    </div>
    <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
      {/* ... (remaining carousel HTML unchanged) */}
    </div>
    <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis">
      <div className="px-2">
        <h1 className="display-5 fst-italic">About {user.company}</h1>
        <p className="lead my-3">{user.description}</p>
        <p className="lead mb-0"><a href="pet_seeker.html" className="text-body-emphasis fw-bold">See all pets available from this location</a></p>
      </div>
    </div>
    <div className="row mb-2 d-flex">
                <div className="col-md-6">
                  <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                      <strong className="d-inline-block mb-2 text-emphasis" style={{ color: '#304C89' }}>Location</strong>
                      <h3 className="mb-0">{user.address}</h3>
                      <p className="card-text mb-auto">{user.company} can be found at {user.address}.</p>
                    </div>
                  <div className="col-auto d-none d-lg-block" style={{ display: 'flex', alignItems: 'stretch' }}>
                    <iframe
                      width="1000"
                      height="450"
                      style={{border: "0"}}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={mapUrl}>
                    </iframe>
                  </div>
                  </div>
                </div>
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-emphasis" style={{ color: '#304C89' }}>Contact</strong>
                        <h3 className="mb-0">Contact Information</h3>
                        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
                          <div className="list-group" style={{ width: '100%', marginBottom: '1px' }}>
                            {/* <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true"> */}
                            <Link to={user.website} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <BsWindow style={{ fontSize: '1.5em'}} />
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                  <h6 className="mb-0">Website</h6>
                                  <p className="mb-0 opacity-75">{user.website}</p>
                                </div>
                              </div>
                            </Link>
                            {/* </a> */}
                            <Link to={user.phone} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                            <BsTelephone style={{ fontSize: '1.5em'}} />
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                  <h6 className="mb-0">Phone</h6>
                                  <p className="mb-0 opacity-75">{user.phone}</p>
                                </div>
                              </div>
                            </Link>
                            <Link to={user.email} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                              <MdOutlineEmail style={{ fontSize: '1.5em'}} />
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                  <h6 className="mb-0">Email</h6>
                                  <p className="mb-0 opacity-75">{user.email}</p>
                                </div>
                              </div>
                            </Link>
                            <Link to={user.twitter} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                              <BsTwitterX style={{ fontSize: '1.5em'}} />
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                  <h6 className="mb-0">Twitter</h6>
                                  <p className="mb-0 opacity-75">{user.twitter}</p>
                                </div>
                              </div>
                            </Link>
                            <Link to={user.instagram} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                              <BsInstagram style={{ fontSize: '1.5em'}} />
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                  <h6 className="mb-0">Instagram</h6>
                                  <p className="mb-0 opacity-75">{user.instagram}</p>
                                </div>
                              </div>
                            </Link>
                            <Link to={user.facebook} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                              <FaFacebookSquare style={{ fontSize: '1.5em' }}/>
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                  <h6 className="mb-0">Facebook</h6>
                                  <p className="mb-0 opacity-75">{user.facebook}</p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
  </div>
  );
};

export default ShelterInfo;