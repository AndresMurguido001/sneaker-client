import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "../Context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ ok, userId }) => (
      <Route
        render={props => {
          if (ok) {
            console.log("USERID");
            return <Component {...props} />;
          } else {
            console.log("NOT USER ID");
            return <Redirect to="/" />;
          }
        }}
        {...rest}
      />
    )}
  </AuthConsumer>
);
export default ProtectedRoute;
