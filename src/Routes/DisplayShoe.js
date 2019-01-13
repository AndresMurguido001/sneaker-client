import React from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { getShoeQuery } from "../ApolloService/ApolloRequests";
import ShoeDisplay from "../Components/ShoeDisplay";
import displayShoeBg from "../images/displayShoe.jpg";

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
    padding: "5rem 0",
    display: "flex",
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${displayShoeBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }
};
