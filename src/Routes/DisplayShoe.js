import React from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { getShoeQuery } from "../ApolloService/ApolloRequests";
import ShoeDisplay from "../Components/ShoeDisplay";

let DisplayShoe = ({ data: { loading, getShoe } }) => {
  if (loading) {
    return (
      <Dimmer active>
        <Loader size="big">Loading</Loader>
      </Dimmer>
    );
  }

  return (
 
      <div style={styles.flexWrap}>
        <Container>
          <ShoeDisplay shoe={getShoe.shoe} />
        </Container>
      </div>
 
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
