import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setAlert } from '../actions/alert';
import { changePassword, changePhone, loadUser } from '../actions/authActions';

const Account = ({ user, setAlert, changePassword, changePhone, loadUser }) => {
  const {
    name,
    email,
    bloodgrp,
    phone,
    address: { city, state, country }
  } = user;

  const [form, toggleForm] = useState(false);
  const [pnoForm, togglepnoForm] = useState(false);
  const [formData, setFormData] = useState({
    newp: '',
    current: '',
    confirm: ''
  });
  const [pno, setpno] = useState('');

  const { newp, current, confirm } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clear = () =>
    setFormData({ ...formData, current: '', newp: '', confirm: '' });

  const onSubmit = async e => {
    e.preventDefault();
    if (!newp || !current || !confirm)
      setAlert('Please fill in all fields', 'red');
    else if (newp !== confirm) setAlert('New Passwords do not match', 'red');
    else {
      await changePassword(current, newp);
      clear();
      toggleForm(!form);
    }
  };

  const onChangePhone = async e => {
    e.preventDefault();
    if (!pno) setAlert('Phone number is blank', 'red');
    else await changePhone(pno);
    setpno('');
    loadUser();
    togglepnoForm(!pnoForm);
  };

  const btnStyles = {
    marginTop: '15px',
    marginBottom: '15px',
    marginRight: '15px'
  };

  return (
    <div>
      <h4>Account Details</h4>

      <div>
        <div className='row'>
          <div className='col s2'>
            {' '}
            <strong>Name</strong>:{' '}
          </div>
          <div className='col s10'>{name}</div>
        </div>
        <div className='row'>
          <div className='col s2'>
            {' '}
            <strong>Email</strong>:{' '}
          </div>
          <div className='col s10'>{email}</div>
        </div>
        <div className='row'>
          <div className='col s2'>
            {' '}
            <strong>Phone</strong>:{' '}
          </div>
          <div className='col s10'>{phone}</div>
        </div>
        <div className='row'>
          <div className='col s2'>
            {' '}
            <strong>Blood Group</strong>:{' '}
          </div>
          <div className='col s10'>{bloodgrp}</div>
        </div>
        <div className='row'>
          <div className='col s2'>
            {' '}
            <strong>Address</strong>:{' '}
          </div>
          <div className='col s10'>
            {city}, {state}, {country}
          </div>
        </div>

        <div className='row'>
          <div className='col s12 m6'>
            <a
              className='lead red-text'
              href='#!'
              onClick={() => toggleForm(!form)}
            >
              {!form ? 'Change Password' : 'Dismiss'}
            </a>

            {form && (
              <form onSubmit={onSubmit}>
                <div className='row'>
                  <div className='col s12 input-field'>
                    <input
                      type='password'
                      name='current'
                      id='current'
                      value={current}
                      onChange={onChange}
                    />
                    <label htmlFor='current'>Current Password</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s12 input-field'>
                    <input
                      type='password'
                      name='newp'
                      id='newp'
                      value={newp}
                      onChange={onChange}
                    />
                    <label htmlFor='newp'>New Password</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s12 input-field'>
                    <input
                      type='password'
                      name='confirm'
                      id='confirm'
                      value={confirm}
                      onChange={onChange}
                    />
                    <label htmlFor='confirm'>Confirm Password</label>
                  </div>
                </div>

                <button className='btn red darken-4'>Change</button>
              </form>
            )}
          </div>

          <div className='col m6 s12'>
            <a
              style={btnStyles}
              className='lead red-text'
              href='#!'
              onClick={() => togglepnoForm(!pnoForm)}
            >
              {!pnoForm ? 'Change Phone Number' : 'Dismiss'}
            </a>

            {pnoForm && (
              <form onSubmit={onChangePhone}>
                <div className='row'>
                  <div className='col s12 input-field'>
                    <input
                      type='text'
                      name='phone'
                      id='phone'
                      value={pno}
                      onChange={e => setpno(e.target.value)}
                    />
                    <label htmlFor='phone'>New Phone Number</label>
                  </div>
                </div>

                <button className='btn red darken-4'>Change Phone</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  { setAlert, changePassword, changePhone, loadUser }
)(Account);
