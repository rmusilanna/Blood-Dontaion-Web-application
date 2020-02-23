import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../actions/alert';

import { register } from '../actions/authActions';

const Register = ({ register, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    password2: '',
    email: '',
    bloodgrp: '',
    phone: '',
    city: '',
    state: '',
    country: ''
  });

  const {
    name,
    password,
    password2,
    email,
    bloodgrp,
    phone,
    city,
    state,
    country
  } = formData;

  const bgroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const renderGroups = () =>
    bgroups.map((bgroup, index) => (
      <option key={index} value={bgroup}>
        {bgroup}
      </option>
    ));

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'red');
    } else {
      register({
        name,
        email,
        password,
        bloodgrp,
        city,
        state,
        country,
        phone
      });
    }
  };

  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll('select'));
  }, []);
  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <div>
      <h3>Register</h3>
      <div className='row'>
        <form className='col s12' onSubmit={onSubmit}>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                name='name'
                value={name}
                onChange={onChange}
                id='name'
                type='text'
                className='validate'
              />
              <label htmlFor='name'>Name</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s6'>
              <input
                name='email'
                value={email}
                onChange={onChange}
                id='email'
                type='email'
                className='validate'
              />
              <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field col s6'>
              <input
                name='phone'
                value={phone}
                onChange={onChange}
                id='phone'
                type='text'
                className='validate'
              />
              <label htmlFor='phone'>Phone</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <input
                name='password'
                value={password}
                onChange={onChange}
                id='password'
                type='password'
                className='validate'
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <input
                name='password2'
                value={password2}
                onChange={onChange}
                id='password2'
                type='password'
                className='validate'
              />
              <label htmlFor='password2'>Confirm Password</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <select name='bloodgrp' value={bloodgrp} onChange={onChange}>
                <option value=''>Choose your blood group</option>

                {renderGroups()}
              </select>
              <label>Blood Group</label>
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
            Register
            <i className='material-icons right'>send</i>
          </button>
        </form>
      </div>
      <p>
        Already have an account? Login <Link to='/login'>here</Link>
      </p>
    </div>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, setAlert }
)(Register);
