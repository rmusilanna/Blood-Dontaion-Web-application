import React, { Fragment, useEffect } from 'react';
import M from 'materialize-css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

const Navbar = ({ isAuthenticated, loading, logout, history }) => {
  useEffect(() => {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
  }, []);

  const authLinks = (
    <Fragment>
      <li><Link to='/previous'>Previous Donations</Link></li>
      <li><Link to='/account'>Account</Link></li>
      <li>
        <a
          href='#!'
          onClick={() => {
            logout(history);
          }}
        >
          Logout
      </a>
      </li>

    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='white' role='navigation'>
      <div className='nav-wrapper container'>
        <Link id='logo-container' to='/' className='brand-logo'>
          BDonation
        </Link>

        <ul className='right hide-on-med-and-down'>
          <li>
            <Link to='/search'>Search Blood</Link>
          </li>


          <li> <a className='dropdown-trigger' href='#!' data-target='dropdown1'>Request Blood</a> </li>

          <ul id='dropdown1' className='dropdown-content'>
            <li>
              <Link to='/request'>Make Request</Link>
            </li>
            <li>
              <Link to='/track'>Track Request</Link>
            </li>
          </ul>

          {<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </ul>

        <ul id='nav-mobile' className='sidenav'>
          <li>
            <Link to='/search'>Search Blood</Link>
          </li>
          <li>
            <Link to='/request'>Request Blood</Link>
          </li>
          <li>
            <Link to='/track'>Track Request</Link>
          </li>
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </ul>
        <Link to='#' data-target='nav-mobile' className='sidenav-trigger'>
          <i className='material-icons'>menu</i>
        </Link>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated, loading } }) => ({
  isAuthenticated,
  loading
});

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Navbar));
