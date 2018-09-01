import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const HomeNav = () => {
  let token = localStorage.getItem("token");
  let currentUserId;
  if (token) {
    let {
      user: { id }
    } = jwt_decode(token);
    currentUserId = id;
  }
  return (
    <Grid
      columns={token ? 3 : 2}
      style={{
        width: "50%",
        float: "right",
        fontSize: "20px",
        padding: "10px 20px"
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
        {token ? (
          <Grid.Column>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to={`/${currentUserId}`}
            >
              <Icon name="user circle outline" />
              Profile
            </Link>
          </Grid.Column>
        ) : null}
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
