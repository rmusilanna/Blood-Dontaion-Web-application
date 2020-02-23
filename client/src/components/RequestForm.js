import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { requestBlood } from '../actions/blood';

const RequestForm = ({ requestBlood, auth: { isAuthenticated, user } }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bloodgrp: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    reminder: false,
    purpose: ''
  });

  const {
    name,
    email,
    bloodgrp,
    phone,
    reminder,
    city,
    state,
    country
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    requestBlood(formData);
  };

  useEffect(() => {
    // M.FormSelect.init(document.querySelectorAll('select'));
    M.updateTextFields();
    setFormData({
      name: (user && user.name) || '',
      email: (user && user.email) || '',
      bloodgrp: (user && user.bloodgrp) || '',
      phone: (user && user.phone) || '',
      city: (user && user.address.city) || '',
      state: (user && user.address.state) || '',
      country: (user && user.address.country) || '',
      purpose: ''
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <Fragment>
      <h3>Request for Blood</h3>
      <div className='row'>
        <form className='col s12' onSubmit={onSubmit}>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                name='name'
                value={name}
                onChange={onChange}
                type='text'
                placeholder='Patient Name'
                className='validate active'
              />
              <label>Patient Name</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                name='email'
                value={email}
                onChange={onChange}
                type='email'
                placeholder='Patient Email'
                className='validate active'
              />
              <label>Patient Email</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                name='phone'
                value={phone}
                onChange={onChange}
                type='text'
                placeholder='Phone Number'
                className='validate active'
              />
              <label>Patient Phone Number</label>
            </div>
          </div>

          <div className='row'>
            <div className='col s8'>
              <label>Patient Blood Group</label>
              <select
                className='browser-default'
                name='bloodgrp'
                value={bloodgrp}
                onChange={onChange}
              >
                <option value=''>Choose blood group</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
              </select>
            </div>
            <div className='col s4'>
              <p>
                <label htmlFor='reminder'>
                  <input
                    type='checkbox'
                    name='reminder'
                    id='reminder'
                    defaultChecked={reminder}
                    onChange={e =>
                      setFormData({ ...formData, reminder: e.target.checked })
                    }
                  />
                  <span>Need Monthly Reminder ?</span>{' '}
                </label>
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s4'>
              <input
                onChange={onChange}
                value={city}
                id='city'
                name='city'
                placeholder='City'
                type='text'
                className='validate'
              />
              <label className='active' htmlFor='city'>
                Address
              </label>
            </div>
            <div className='input-field col s4'>
              <input
                onChange={onChange}
                name='state'
                value={state}
                id='state'
                placeholder='State'
                type='text'
                className='validate'
              />
            </div>
            <div className='input-field col s4'>
              <input
                onChange={onChange}
                value={country}
                name='country'
                id='country'
                placeholder='Country'
                type='text'
                className='validate'
              />
            </div>
          </div>

          <button
            className='btn waves-effect waves-light red darken-4'
            type='submit'
          >
            Request for blood
            <i className='material-icons right'>send</i>
          </button>
        </form>
      </div>
      {!isAuthenticated && (
        <p>
          Blood Donor? Register <Link to='/register'>here</Link>
        </p>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { requestBlood }
)(RequestForm);
