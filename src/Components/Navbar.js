import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const HomeNav = ({ userId }) => {
  return (
    <Grid
      columns={3}
      style={{
        width: "50%",
        float: "right",
        fontSize: "20px",
        padding: "10px 5px"
      }}
      textAlign="right"
    >
      <Grid.Row>
        <Grid.Column>
          <Link style={{ textDecoration: "none", color: "#000" }} to="/">
            {" "}
            <Icon name="home" />
            Home{" "}
          </Link>
        </Grid.Column>
        <Grid.Column>
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to={`/${userId}`}
          >
            <Icon name="user circle outline" />
            Profile
          </Link>
        </Grid.Column>
        <Grid.Column>
          <Link style={{ textDecoration: "none", color: "#000" }} to="/shoes">
            <Icon name="shop" />
            Shop
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
