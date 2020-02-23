import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  const alts = alerts.map(({ id, color, msg }) => (
    <div className='row' key={id}>
      <div className='col s12'>
        <div className={`card ${color} darken-1`}>
          <div
            style={{ padding: '0.5rem' }}
            className='card-content white-text'
          >
            <p>{msg}</p>
          </div>
        </div>
      </div>
    </div>
  ));
  return <Fragment>{alts}</Fragment>;
};

const mapStateToProps = ({ alert }) => ({ alerts: alert });

export default connect(mapStateToProps)(Alert);
