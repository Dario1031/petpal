import React, { useState } from 'react';

const ApplicationCard = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
// //   const [is_shelter, setShelter] = useState('');

//   const handleLogin = () => {
//     // Handle login logic here (e.g., API call to your Django backend)
//     console.log('Creating User with:', { username, password });
//   };

  return (
    <div class="col-lg-4 mb-3 d-flex align-items-stretch">
                          <div class="card">
                            <img src="https://media-be.chewy.com/wp-content/uploads/2022/09/27095535/cute-dogs-pembroke-welsh-corgi.jpg" class="card-img-top" alt="Card Image" />
                            <div class="card-body d-flex flex-column">
                              <h5 class="card-title">Ein</h5>
                              <p class="card-text mb-4">Insert some placeholder text about how the shelter got ahold of this animal, perhaps some details about its past conditions/experiences.</p>
                              <button class="btn btn-primary mt-auto align-self-start" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>
                              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1 class="modal-title fs-5" id="exampleModalLabel">Ein</h1>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <ul>
                                        <li>Animal: Dog</li>
                                        <li>Breed: Pembroke Welsh Corgi</li>
                                        <li>Age: 2 years</li>
                                        <li>Sex: Male</li>
                                        <li>Demeanor: Friendly</li>
                                        <li>Status: Available</li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>                  
                              <button class="btn btn-primary align-self-start btn-margin" data-bs-toggle="modal" data-bs-target="#StatusModal">Check Status</button>
                              <div class="modal fade" id="StatusModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h1 class="modal-title fs-5" id="exampleModalLabel">Ein</h1>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <ul>
                                        <li class="font-color-green">Status: Accepted</li>
                                      </ul>
                                    </div>
                                    <div class="modal-footer">
                                      <a href="existing_application.html" type="button" class="btn btn-secondary">View Application</a>
                                    </div>
                                  </div>
                                </div>
                              </div>                  
                            </div>
                          </div>
                        </div>
  );
};

export default ApplicationCard;