import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <div>
      <h3>Login</h3>
      <div className='row'>
        <form className='col s12' onSubmit={onSubmit}>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                value={email}
                onChange={onChange}
                id='email'
                name='email'
                type='email'
                className='validate'
              />
              <label htmlFor='email'>Email</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <input
                value={password}
                onChange={onChange}
                id='password'
                name='password'
                type='password'
                className='validate'
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>

          <div className='row'>
            <div className='col s12'>
              <button
                className='btn waves-effect waves-light red darken-4'
                type='submit'
              >
                Login
                <i className='material-icons right'>send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <p>
        Don't have an account? Sign up <Link to='/register'>here</Link>
      </p>
    </div>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
