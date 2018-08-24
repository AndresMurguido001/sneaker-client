import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import ProfileUser from "../Components/ProfileUser";
import ModalWrap from "../Components/ModalWrap";
import { Container } from "semantic-ui-react";
import UploadShoe from "../Components/UploadShoe";

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
    <Container>
      <h1>{`Welcome To Your Profile ${getUser.firstname}`}</h1>
      <ProfileUser data={getUser} />
      <Container>
        <ModalWrap>
          <UploadShoe userId={getUser.id} />
        </ModalWrap>
      </Container>
    </Container>
  );
};

export default graphql(meQuery, { options: { fetchPolicy: "cache-first" } })(
  MyProfile
);
