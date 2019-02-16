import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-boost";
import { getMainDefinition } from "apollo-utilities";
import { ApolloLink, split } from "apollo-link";
import { ApolloClient } from "apollo-client";

const httpLink = new HttpLink({ uri: `http://${process.env.REACT_APP_SERVER_URL}/graphql` });

const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_SERVER_URL}/subscriptions`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => ({
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken")
    })
  }
});

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
const linkWithMiddleware = afterwareLink.concat(
  authMiddleware.concat(httpLink)
);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  linkWithMiddleware
);

let client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

export default client;
