import React from 'react';
import { connect } from 'react-redux';
import { changeShowForm } from '../actions/blood';

const Donors = ({ donors, changeShowForm }) => {
  const renderContent = () => {
    if (!donors || donors.length === 0) return <h5>No Donors Available</h5>;

    const list = donors.map(
      ({ _id, name, email, phone, address: { city, state, country } }) => (
        <tr key={_id}>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{city}</td>
          <td>{state}</td>
          <td>{country}</td>
        </tr>
      )
    );

    return (
      <table className='striped responsive-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>

        <tbody>{list}</tbody>
      </table>
    );
  };

  const btnStyles = {
    margin: '1rem 0'
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

      {renderContent()}
    </div>
  );
};

export default connect(
  null,
  { changeShowForm }
)(Donors);
