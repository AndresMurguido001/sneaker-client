import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import ProfileUser from "../Containers/ProfileUser";
import { Container, Loader, Dimmer } from "semantic-ui-react";
import ProfileMenu from "../Components/ProfileMenu";
import "../styles/Profile.css";

let meQuery = gql`
  query($id: String!) {
    getUser(id: $id) {
      id
      email
      firstname
      lastname
      profilePic
      shoes {
        brand
        numberOfLikes
        description
        model
        size
        photos
        owner {
          id
          profilePic
        }
      }
    }
  }
`;

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
      <Container style={{ height: "100vh" }}>
        <ProfileMenu />
        <h1>{`Welcome To Your Profile ${getUser.firstname}`}</h1>
        <ProfileUser data={getUser} />
      </Container>
    );
  }
}

export default graphql(meQuery, {
  options: ({
    match: {
      params: { id }
    }
  }) => ({
    variables: { id: id },
    fetchPolicy: "cache-and-network"
  })
})(MyProfile);
