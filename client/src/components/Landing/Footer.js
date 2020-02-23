import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='page-footer grey lighten-2'>
      <div className='container'>
        <div className='row'>
          <div className='col l6 s12'>
            <h5 className='black-text'>Our Bio</h5>
            <p className='black-text text-lighten-4'>
              We are a team of college students working on this project like
              it's our full time job. Any support is greatly appreciated.
            </p>
          </div>

          <div className='col l3 s12 right'>
            <h5 className='black-text'>Links</h5>
            <ul>
              <li>
                <Link className='black-text' to='/register'>
                  Register as a Donor
                </Link>
              </li>
              <li>
                <Link className='black-text' to='/login'>
                  Login as a Donor
                </Link>
              </li>
              <li>
                <Link className='black-text' to='/search'>
                  Search For Donors
                </Link>
              </li>
              <li>
                <Link className='black-text' to='request'>
                  Request for Blood
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='footer-copyright'>
        <div className='container center brown-text'>&copy; {new Date().getFullYear()} BDonation. All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
