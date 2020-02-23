import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeShowForm } from '../actions/blood';

import RequestForm from './RequestForm';
import RequestDetail from './RequestDetail';

const BloodRequest = ({ changeShowForm, blood: { request, showForm } }) => {
  useEffect(() => {
    return () => {
      changeShowForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return showForm ? <RequestForm /> : <RequestDetail request={request} />;
};

const mapStateToProps = ({ blood }) => ({ blood });

export default connect(
  mapStateToProps,
  { changeShowForm }
)(BloodRequest);
