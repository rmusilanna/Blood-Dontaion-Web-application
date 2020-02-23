import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import ActiveList from './ActiveList';
import { getPrevDonations, resetTrack } from '../actions/blood';

const PrevDonations = ({ getPrevDonations, requests, isAuthenticated }) => {

    useEffect(() => {
        getPrevDonations();
        return () => resetTrack()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!isAuthenticated)
        return <Redirect to='/login' />
    return (
        <div>
            <h4>Donation History</h4>

            <ActiveList activeRequests={requests} />

        </div>
    );
};

const mapStateToProps = ({ blood: { requests }, auth: { isAuthenticated } }) => ({ requests, isAuthenticated });

export default connect(mapStateToProps, { getPrevDonations, resetTrack })(PrevDonations);
