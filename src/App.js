import React, { Component } from "react";
import "./index.css";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-boost";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import jwt_decode from "jwt-decode";
//Routes
import Home from "./Routes/Home";
import MyProfile from "./Routes/Profile";
import Shoes from "./Routes/Shoes";
import DisplayShoe from "./Routes/DisplayShoe";

const httpLink = createHttpLink({ uri: "http://localhost:8080/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "x-token": localStorage.getItem("token") || null,
      "x-refreshToken": localStorage.getItem("refreshToken") || null
    }
  });

  return forward(operation);
});
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;

    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refreshToken");

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      }
    }

    return response;
  });
});

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  let currentUser;
  try {
    let {
      user: { id }
    } = jwt_decode(token);
    currentUser = id;
    const { exp } = jwt_decode(refreshToken);

    if (Date.now() / 1000 > exp) {
      return {
        ok: false,
        userId: 0
      };
    }
  } catch (err) {
    return {
      ok: false,
      userId: 0
    };
  }
  return {
    ok: true,
    userId: currentUser
  };
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);

const link = afterwareLink.concat(authMiddleware.concat(httpLink));

let client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export const { Provider, Consumer } = React.createContext();

class App extends Component {
  render() {
    let { ok, userId } = isAuthenticated();
    return (
      <Provider value={ok ? userId : 0}>
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/shoes" component={Shoes} />
              <PrivateRoute exact path="/:id" component={MyProfile} />
              <PrivateRoute exact path="/shoes/:id" component={DisplayShoe} />
            </Switch>
          </Router>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
