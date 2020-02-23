import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { trackRequest, resetTrack } from '../actions/blood';


const Track = ({ match, resetTrack, trackRequest, request }) => {

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
                requestDate
            } = request;

            return (
                <div>

                    <div className="row">
                        <div className="col s3"><strong>Patient Name</strong>:</div>
                        <div className="col s3">{name || ''}</div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col s3"><strong>Patient Email</strong>: </div>
                        <div className="col s3">{email || ''}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col s3"><strong>Patient Blood Group</strong>: </div>
                        <div className="col s3">{bloodgrp || ''}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col s3"><strong>Patient Address</strong>: </div>
                        <div className="col s3">{address && address.city}, {address && address.state}, {address && address.country}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col s3"><strong>Status</strong>: </div>
                        <div className="col s3">{status ? 'Donation Successful' : 'Awaiting Donation'}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col s3"><strong>Requested On</strong>: </div>
                        <div className="col s9">{requestDate ? moment(requestDate).format('LLLL') : ''}</div>
                    </div>

                </div>
            );
        } else return <p className="lead">No Request Found</p>
    }



    const btnStyles = {
        marginTop: '15px',
        marginBottom: '15px',
    };

    return (
        <div>


            <h4>Tracking Results</h4>

            {renderContent()}

            <Link
                style={btnStyles}
                className='btn red darken-4 '
                to='/track'
            >
                Back
        </Link>
        </div>
    );
};

const mapStateToProps = ({ blood: { request } }) => ({ request });

export default connect(mapStateToProps, { trackRequest, resetTrack })(Track);
