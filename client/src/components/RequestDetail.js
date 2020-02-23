import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { changeShowForm } from '../actions/blood';

const RequestDetail = ({ request, changeShowForm }) => {
  const idRef = useRef(null);

  const onCopy = () => {
    const range = document.createRange();
    range.selectNode(idRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  };

  const copyStyles = {
    marginLeft: '20px',
    paddingTop: '10px',
    cursor: 'pointer'
  };

  const renderContent = () => {
    if (request) {
      const {
        _id,
        name,
        email,
        bloodgrp,
        phone,
        address: { city, state, country },
        status
      } = request;
      return (
        <div
          style={{
            marginTop: '15px',
            marginBottom: '15px'
          }}
        >
          <div className='row'>
            <div className='col s3'>
              <strong>Patient Name</strong>:
            </div>
            <div className='col s3'>{name}</div>
          </div>
          <hr />
          <div className='row'>
            {/* <div className="row"> */}
            <div className='col s3'>
              <strong>Request ID</strong>:
            </div>
            <div className='col s9'>
              {' '}
              <span ref={idRef}> {_id}</span>{' '}
              <i
                onClick={onCopy}
                title='Click to copy'
                style={copyStyles}
                className='material-icons'
              >
                content_copy
              </i>
            </div>
          </div>
          <div className='row'>
            <div className='col s3'></div>
            <div className='col s9'>
              <small>Please store this ID track your request.</small>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col s3'>
              <strong>Patient Email</strong>:{' '}
            </div>
            <div className='col s3'>{email}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col s3'>
              <strong>Patient Phone Number</strong>:{' '}
            </div>
            <div className='col s3'>{phone}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col s3'>
              <strong>Patient Blood Group</strong>:{' '}
            </div>
            <div className='col s3'>{bloodgrp}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col s3'>
              <strong>Patient Address</strong>:{' '}
            </div>
            <div className='col s9'>
              {city}, {state}, {country}
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
        </div>
      );
    } else return <div>Nothing here</div>;
  };

  const btnStyles = {
    marginTop: '15px',
    marginBottom: '15px',
    padding: '0.2rem 2rem'
  };

  return (
    <div>
      <button
        style={btnStyles}
        className='btn red darken-4 '
        onClick={changeShowForm}
      >
        Back
      </button>

      <h4>Request Details</h4>

      {renderContent()}
    </div>
  );
};

export default connect(
  null,
  { changeShowForm }
)(RequestDetail);
