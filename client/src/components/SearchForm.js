import React, { useState, useEffect, Fragment } from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { searchBlood } from '../actions/blood';

const Search = ({ searchBlood }) => {
    const [formData, setFormData] = useState({
        bloodgrp: '',
        city: '',
        state: '',
        country: ''
    });

    const { bloodgrp, city, state, country } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        searchBlood(formData);
    };

    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'));
    }, []);

    return (
        <Fragment>
            <h3>Search for Blood</h3>
            <div className='row'>
                <form className='col s12' onSubmit={onSubmit}>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <select name='bloodgrp' value={bloodgrp} onChange={onChange}>
                                <option value="">Choose blood group</option>
                                <option value='O+'>O+</option>
                                <option value='O-'>O-</option>
                                <option value='A+'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='B+'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='AB+'>AB+</option>
                                <option value='AB-'>AB-</option>
                            </select>
                            <label>Blood Group</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s4'>
                            <input
                                onChange={onChange}
                                value={city}
                                id='city'
                                name='city'
                                placeholder='City'
                                type='text'
                                className='validate'
                            />
                            <label className='active' htmlFor='city'>
                                Address
              </label>
                        </div>
                        <div className='input-field col s4'>
                            <input
                                onChange={onChange}
                                name='state'
                                value={state}
                                id='state'
                                placeholder='State'
                                type='text'
                                className='validate'
                            />
                        </div>
                        <div className='input-field col s4'>
                            <input
                                onChange={onChange}
                                value={country}
                                name='country'
                                id='country'
                                placeholder='Country'
                                type='text'
                                className='validate'
                            />
                        </div>
                    </div>

                    <button
                        className='btn waves-effect waves-light red darken-4'
                        type='submit'
                    >
                        Search
            <i className='material-icons right'>send</i>
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default connect(
    null,
    { searchBlood }
)(Search);
