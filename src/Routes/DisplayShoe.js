import React from "react";
import ProfileMenu from "../Components/ProfileMenu";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import ShoeDisplay from "../Components/ShoeDisplay";

let getShoeQuery = gql`
  query($shoeId: Int!) {
    getShoe(shoeId: $shoeId) {
      ok
      shoe {
        brand
        model
        owner {
          id
          profilePic
          firstname
	lastname
        }
        description
        numberOfLikes
        photos
        size
      }
    }
  }
`;

let DisplayShoe = ({ data: { loading, getShoe } }) => {
  if (loading) {
    return (
      <Dimmer active>
        <Loader size="big">Loading</Loader>
      </Dimmer>
    );
  }
  return (
    <ProfileMenu>
      <Container style={{ height: "100vh" }}>
        <ShoeDisplay shoe={getShoe.shoe} />
      </Container>
    </ProfileMenu>
  );
};

export default graphql(getShoeQuery, {
  options: ({
    match: {
      params: { id }
    }
  }) => ({
    variables: { shoeId: id }
  })
})(DisplayShoe);
