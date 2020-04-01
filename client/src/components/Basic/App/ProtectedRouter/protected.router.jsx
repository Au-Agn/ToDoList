import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ component, ...rest }) => {
  const Component = component;
  return (
    <Route
      {...rest}
      render={
        props => (
          localStorage.getItem('user') ? <Component {...props} />
            : <Redirect to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }} />
      )
      }
    />
  );
};

export default ProtectedRoute;