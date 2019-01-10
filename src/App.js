import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Routes
import Home from "./Routes/Home";
import MyProfile from "./Routes/MyProfile";
import Shoes from "./Routes/Shoes";
import DisplayShoe from "./Routes/DisplayShoe";
import Theme from "./styles/Theme";
import { Navbar } from "./Containers/Navbar";
import client from "./ApolloService/ApolloClient";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Routes/ProtectedRoute";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <ApolloProvider client={client}>
          <Theme>
            <Router>
              <div>
                <Route path="/" component={Navbar} />
                <Route exact path="/" component={Home} />
                <ProtectedRoute
                  exact
                  path="/profile/:id"
                  component={MyProfile}
                />
                <Route
                  exact
                  path="/shoes/search/:searchQuery?"
                  component={Shoes}
                />
                <Route exact path="/shoes" component={Shoes} />
                <Route exact path="/shoes/:id" component={DisplayShoe} />
              </div>
            </Router>
          </Theme>
        </ApolloProvider>
      </AuthProvider>
    );
  }
}

export default App;
