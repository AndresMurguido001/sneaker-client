import React from "react";
import { isAuthenticated } from "../utils/auth";

export const AuthContext = React.createContext();
// use componentDidUpdate for components using this provider;
class AuthProvider extends React.Component {
  render() {
    const { ok, userId } = isAuthenticated();
    return (
      <AuthContext.Provider
        value={{
          ok,
          userId
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
