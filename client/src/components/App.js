import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadUser } from '../actions/authActions';

import '../style.css';
import Navbar from './Navbar';
import Landing from './Landing/Landing';
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';
import Account from './Account';
import Alert from './Alert';
import setAuthToken from '../utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';
import BloodRequest from './BloodRequest';
import PrevDonations from './PrevDonations';
import TrackRequest from './TrackRequest';
import ActiveItem from './ActiveItem';
import Track from './Track';
import Search from './Search';

import { authError } from '../actions/authActions';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUser, isAuthenticated, authError }) => {
  useEffect(() => {
    if (localStorage.token) loadUser();
    else authError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />

        <Route path='/' exact component={Landing} />

        <div className='container'>
          <Alert />
          <Switch>
            <PrivateRoute path='/previous' exact component={PrevDonations} />
            <PrivateRoute path='/dashboard' exact component={Dashboard} />
            <PrivateRoute path='/account' exact component={Account} />

            <Route path='/register' exact component={Register} />
            <Route path='/request' exact component={BloodRequest} />
            <Route path='/request/:id' exact component={ActiveItem} />
            <Route path='/search' exact component={Search} />
            <Route path='/login' exact component={Login} />
            <Route path='/track' exact component={TrackRequest} />
            <Route path='/track/:id' exact component={Track} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadUser, authError }
)(App);
