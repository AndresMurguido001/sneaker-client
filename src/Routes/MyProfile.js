import React from "react";
import { graphql } from "react-apollo";
import ProfileUser from "../Containers/ProfileUser";
import { Container, Loader, Dimmer } from "semantic-ui-react";
import nikeWall from "../images/nikeWall.jpg";
import { meQuery } from "../ApolloService/ApolloRequests";

class MyProfile extends React.Component {
  render() {
    let {
      data: { loading, getUser }
    } = this.props;

    if (loading) {
      return (
        <Dimmer active>
          <Loader size="big">Loading</Loader>
        </Dimmer>
      );
    }

    return (
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${nikeWall})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <Container>
          <ProfileUser data={getUser} />
        </Container>
      </div>
    );
  }
}

export default graphql(meQuery, {
  options: ({
    match: {
      params: { id }
    }
  }) => ({
    variables: { id },
    fetchPolicy: "cache-and-network"
  })
})(MyProfile);
