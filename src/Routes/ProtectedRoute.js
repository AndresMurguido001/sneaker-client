import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../Context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ ok, userId }) => (
      <Route
        render={props => {
          if (ok) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
        {...rest}
      />
    )}
  </AuthConsumer>
);
export default ProtectedRoute;
