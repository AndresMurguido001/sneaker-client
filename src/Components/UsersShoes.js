import React from "react";
import { Grid } from "semantic-ui-react";
import ShoeCell from "./ShoeCell";
import { HeadingSecondary } from "../styles/Home/Home";

const UsersShoes = ({ profilePic, shoes, userId }) => {
  if (shoes.length > 0) {
    return (
      <React.Fragment>
        <HeadingSecondary underlined>Your Shoes</HeadingSecondary>
        <Grid style={{ margin: "5rem auto" }} columns={4}>
          {shoes.map((shoe, index) => {
            return (
              <ShoeCell
                key={`shoe-${shoe.model}-${index}`}
                profileImg={profilePic}
                shoe={shoe}
                userId={userId}
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
      <HeadingSecondary underlined>No shoes</HeadingSecondary>
    </div>
  );
};
export default UsersShoes;
