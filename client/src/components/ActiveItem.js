// import React from 'react'

// const ActiveItem = ({ request: { name, email, status, bloodgrp, address: { city, state, country } } }) => {
//     return (
//         <div className="row">
//             <div className="col s12">
//                 <div className="card-panel red darken-4 white-text">

//                     <div className="row">
//                         <div className="col s3"><strong>Patient Name</strong>:</div>
//                         <div className="col s3">{name}</div>
//                     </div>

//                     <div className="row">
//                         <div className="col s3"><strong>Patient Email</strong>: </div>
//                         <div className="col s3">{email}</div>
//                     </div>

//                     <div className="row">
//                         <div className="col s3"><strong>Patient Address</strong>: </div>
//                         <div className="col s9">{city}, {state}, {country}</div>
//                     </div>
//                     <div className="row">
//                         <div className="col s3"><strong>Status</strong>: </div>
//                         <div className="col s3">{status ? 'Donation Successful' : 'Awaiting Donation'}</div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  trackRequest,
  resetTrack,
  donate,
  cancelDonation
} from '../actions/blood';

const ActiveItem = ({
  match,
  resetTrack,
  trackRequest,
  request,
  auth,
  donate,
  history,
  cancelDonation
}) => {
  const { id } = match.params;

  useEffect(() => {
    trackRequest(id);
    return () => resetTrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (request !== null) {
      const {
        name,
        email,
        status,
        bloodgrp,
        address,
        phone,
        requestDate
      } = request;

      return (
        <div>
          <div className='row'>
            <div className='col s3'>
              <strong>Patient Name</strong>:
            </div>
            <div className='col s3'>{name || ''}</div>
          </div>
          <hr />

          <div className='row'>
            <div className='col s3'>
              <strong>Patient Email</strong>:{' '}
            </div>
            <div className='col s3'>{email || ''}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col s3'>
              <strong>Patient Phone Number</strong>:{' '}
            </div>
            <div className='col s3'>{phone || ''}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col s3'>
              <strong>Patient Blood Group</strong>:{' '}
            </div>
            <div className='col s3'>{bloodgrp || ''}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col s3'>
              <strong>Patient Address</strong>:{' '}
            </div>
            <div className='col s9'>
              {address && address.city}, {address && address.state},{' '}
              {address && address.country}
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col s3'>
              <strong>Status</strong>:{' '}
            </div>
            <div className='col s3'>
              {status ? 'Donation Successful' : 'Awaiting Donation'}
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col s3'>
              <strong>Requested On</strong>:{' '}
            </div>
            <div className='col s9'>
              {requestDate ? moment(requestDate).format('LLLL') : ''}
            </div>
          </div>
        </div>
      );
    } else return <p className='lead'>No Request Found</p>;
  };

  const onDonate = () => {
    donate(id, history);
  };
  const onCancelDonate = () => {
    cancelDonation(id, history);
  };

  const btnStyles = {
    marginTop: '15px',
    marginBottom: '15px',
    marginRight: '15px'
  };

  return (
    <div>
      <h4 style={{ marginBottom: '15px' }}>Request Details</h4>

      {renderContent()}

      <Link style={btnStyles} className='btn red darken-4 ' to='/dashboard'>
        Back
      </Link>

      {auth.isAuthenticated && request && !request.status && (
        <button onClick={onDonate} className='btn black'>
          donate
        </button>
      )}
      {auth.isAuthenticated &&
        request &&
        request.status &&
        request.user === auth.user._id && (
          <button onClick={onCancelDonate} className='btn black'>
            cancel
          </button>
        )}
    </div>
  );
};

const mapStateToProps = ({ blood: { request }, auth }) => ({ request, auth });

export default connect(
  mapStateToProps,
  { trackRequest, resetTrack, donate, cancelDonation }
)(withRouter(ActiveItem));

// export default ActiveItem
