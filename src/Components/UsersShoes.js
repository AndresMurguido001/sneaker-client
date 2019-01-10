import React from "react";
import { Grid, Header } from "semantic-ui-react";
import ShoeCell from "./ShoeCell";

const UsersShoes = ({ profilePic, shoes }) => {
  if (shoes.length > 0) {
    return (
      <React.Fragment>
        <Header as="h3" block>
          Your Currently Listed Shoes
        </Header>
        <Grid columns={4}>
          {shoes.map((shoe, index) => {
            return (
              <ShoeCell
                key={`shoe-${shoe.model}-${index}`}
                profileImg={profilePic}
                shoe={shoe}
                usersProfile
              />
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }
  return (
    <div>
      <h1>You havent posted any shoes</h1>
    </div>
  );
};
export default UsersShoes;
