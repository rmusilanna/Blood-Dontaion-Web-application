import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../Spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
    <Route
      {...rest}
      render={props =>
        loading ? <Spinner /> : !isAuthenticated ? (
          <Redirect to='/login' />
        ) : (
            <Component {...props} />
          )
      }
    />
  );

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(PrivateRoute);
