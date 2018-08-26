import React from "react";
import { Grid } from "semantic-ui-react";
import ShoeCell from "./ShoeCell";

const UsersShoes = ({ shoes }) => (
  <Grid columns={3}>
    {shoes.map((shoe, index) => {
      return <ShoeCell key={`shoe-${shoe.model}-${index}`} shoe={shoe} />;
    })}
  </Grid>
);
export default UsersShoes;
