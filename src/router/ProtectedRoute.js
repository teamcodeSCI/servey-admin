import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ element, children, ...rest }) => {
  let auth = Boolean(localStorage.getItem('access_token'));
  if (!auth) {
    return <Redirect to={'/login'} />;
  }
  return (
    <Route element={element} {...rest}>
      {children}
    </Route>
  );
};

export default ProtectedRoute;
