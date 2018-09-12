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
        id
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
        reviews {
          id
          message
          user {
            email
            id
          }
        }
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
    <ProfileMenu isInverted>
      <div style={styles.flexWrap}>
        <Container>
          <ShoeDisplay shoe={getShoe.shoe} />
        </Container>
      </div>
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

let styles = {
  flexWrap: {
    display: "flex",
    justifyContent: "space-around",
    height: "100%",
    width: "100%"
  }
};
