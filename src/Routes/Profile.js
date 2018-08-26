import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import ProfileUser from "../Containers/ProfileUser";
import { Container } from "semantic-ui-react";

let meQuery = gql`
  query {
    getUser {
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
      }
    }
  }
`;

const MyProfile = ({ data: { loading, getUser } }) => {
  if (loading) {
    return null;
  }
  return (
    <Container>
      <h1>{`Welcome To Your Profile ${getUser.firstname}`}</h1>
      <ProfileUser data={getUser} />
    </Container>
  );
};

export default graphql(meQuery, { options: { fetchPolicy: "cache-first" } })(
  MyProfile
);
