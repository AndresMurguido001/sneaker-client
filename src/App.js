import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-boost";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Routes
import Home from "./Routes/Home";

const httpLink = createHttpLink({ uri: "http://localhost:8080/graphql" });
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;

    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refreshtoken");

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
      }
    }
    return response;
  });
});

const link = afterwareLink.concat(httpLink);

let client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
