import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'

const TrackRequest = props => {

    const [id, setId] = useState('');

    const onChange = e => setId(e.target.value);

    const btnStyles = {
        marginTop: '15px',
        marginBottom: '15px',
    };


    return (
        <Fragment>

            <h4>Track Your Blood Request </h4>
            <div className="row">
                <div className="input-field col s12">
                    <input type="text" id='id' value={id} onChange={onChange} />
                    <label htmlFor="id">Request ID</label>
                </div>
            </div>
            <div className="row">
                <div className="col s12"><Link
                    style={btnStyles}
                    className='btn red darken-4 '
                    to={`/track/${id}`}>Track</Link></div>
            </div>



        </Fragment>
    )
}

export default TrackRequest
