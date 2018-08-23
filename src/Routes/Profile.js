import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import ProfileUser from "../Components/ProfileUser";
import Upload from "../Components/UploadShoe";
import { Container } from "semantic-ui-react";

let meQuery = gql`
  query {
    getUser {
      id
      email
      firstname
      lastname
      shoes {
        brand
        numberOfLikes
        description
        model
      }
    }
  }
`;

const MyProfile = ({ data: { loading, getUser } }) => {
  if (loading) {
    return null;
  }
  return (
    <div>
      <h1>{`Welcome To Your Profile ${getUser.firstname}`}</h1>
      <ProfileUser data={getUser} />
      <Container>
        <Upload userId={getUser.id} />
      </Container>
    </div>
  );
};

export default graphql(meQuery, { options: { fetchPolicy: "cache-first" } })(
  MyProfile
);
