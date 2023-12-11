import React, { useState } from 'react';

const ShelterEditor = () => {

  return (
    <div class="center-form form-box">
      <form class="form-container" enctype="multipart/form-data">
        <div class="form-group">
          <label for="username" class="label-box">Username</label>
          <input type="text" class="form-control input-box" id="username" name="username" placeholder="Toronto_Shelter_123" />
        </div>
        <div class="form-group">
          <label for="companyname" class="label-box">Company Name</label>
          <input type="text" class="form-control input-box" id="companyname" name="companyname" placeholder="Toronto Dog Shelter (TDS)" />
        </div>
        <div class="form-group">
          <label for="email" class="label-box">Email</label>
          <input type="email" class="form-control input-box" id="email" name="email" placeholder="admin@tds.com" />
        </div>
        <div class="form-group">
          <label for="profilepic" class="label-box">Logo</label>
          <input type="file" class="form-control input-box" id="profilepic" name="profilepic" />
        </div>
        <div class="form-row">
          <div class="form-group form-check-inline col-md-8">
            <label for="address" class="label-box">Address</label>
            <input type="text" class="form-control input-box" id="address" name="address" placeholder="56 Bay St" />
          </div>
          <div class="form-group form-check-inline col-md-3">
            <label for="city" class="label-box">City</label>
            <input type="text" class="form-control input-box" id="city" name="city" placeholder="Toronto" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group form-check-inline col-md-5">
            <label for="provinve" class="label-box">Province</label>
            <input type="text" class="form-control input-box" id="provinve" name="provinve" placeholder="Ontario" />
          </div>
          <div class="form-group form-check-inline col-md-5">
            <label for="country" class="label-box">Country</label>
            <input type="text" class="form-control input-box" id="country" name="country" placeholder="Canada" />
          </div>
        </div>
        <div class="form-group">
          <label for="bio" class="label-box">Description</label>
          <textarea class="form-control input-box" placeholder="We are Toronto Dog Shelter and we love taking care of dogs ..." rows="4" id="bio" name="bio"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group form-check-inline col-md-4">
            <label for="phone" class="label-box"> Phone Number</label>
            <input type="number" class="form-control input-box" id="phone" name="phone" placeholder="+13455678631" />
          </div>
          <div class="form-group form-check-inline col-md-7">
            <label for="website" class="label-box">Website</label>
            <input type="text" class="form-control input-box" id="website" name="website" placeholder="www.torontodogshelter.com" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group form-check-inline col-md-3">
            <label for="instagram" class="label-box">Instagram</label>
            <input type="text" class="form-control input-box" id="instagram" name="instagram" placeholder="@TDS" />
          </div>
          <div class="form-group form-check-inline col-md-3">
            <label for="x" class="label-box">X (Twitter)</label>
            <input type="text" class="form-control input-box" id="x" name="x" placeholder="@TDS" />
          </div>
          <div class="form-group form-check-inline col-md-3">
            <label for="facebook" class="label-box">Facebook</label>
            <input type="text" class="form-control input-box" id="facebook" name="facebook" placeholder="@TDS" />
          </div>
        </div>
        <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#StatusModal">Save</a>
        <div class="modal fade" id="StatusModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Shelter Profile</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <ul>
                  <li class="font-color-green">Save Successful: your changes have been made</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <a class="btn btn-primary" id="chat_btn" href="reset_password.html">Reset Password</a>
      </form>
    </div>
  );
};

export default ShelterEditor;