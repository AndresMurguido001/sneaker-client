import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Container, Grid, Dimmer, Loader, Header } from "semantic-ui-react";
import ShoeCell from "../Components/ShoeCell";
import ProfileMenu from "../Components/ProfileMenu.js";
import { Consumer } from "../App";
//Style
import animation from "../animation";
import styles from "../styles/Shoes";
import CardAnimateWrap from "../Components/CardAnimateWrap";

export const AllShoesQuery = gql`
  query {
    getAllShoes {
      id
      brand
      owner {
        id
        profilePic
      }
      model
      numberOfLikes
      size
      description
      photos
    }
  }
`;

class Shoes extends React.Component {
  constructor() {
    super();
    this.mainImage = null;
    this.headerWrap = null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.loading !== this.props.data.loading) {
      animation.shoesMainBg(this.mainImage);
      animation.headerAlign(this.headerWrap);
    }
  }

  render() {
    const {
      data: { loading, getAllShoes }
    } = this.props;
    if (loading) {
      return (
        <Dimmer active>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      );
    }

    let ShoeCells = () => (
      <Consumer>
        {value =>
          getAllShoes.map((shoe, index) => (
            <CardAnimateWrap key={`${shoe.brand}-${index}`}>
              <ShoeCell
                currentUser={value}
                key={`shoe-${shoe.model}-${index}`}
                profileImg={shoe.owner.profilePic}
                shoe={shoe}
                index={index}
              />
            </CardAnimateWrap>
          ))
        }
      </Consumer>
    );

    return (
      <ProfileMenu>
        <div style={styles.shoesIndex.shoesIndexWrap} />
        <Container style={styles.shoesIndex.container} fluid>
          <div
            ref={el => (this.mainImage = el)}
            style={styles.shoesIndex.mainBgLg}
          >
            <Container>
              <div ref={el => (this.headerWrap = el)}>
                <Header
                  style={styles.shoesIndex.primaryHeader}
                  inverted
                  textAlign="center"
                >
                  Welcome To Our Store
                </Header>
                <Header
                  style={styles.shoesIndex.secondaryHeader}
                  inverted
                  textAlign="left"
                  sub
                >
                  Shoes for any occassion. Sneakerhead store allows anyone to
                  sell new shoes. Anyone from a retailer to individuals share
                  their shoes with the world.
                </Header>
              </div>
            </Container>
          </div>

          {/* Figure Out how to get uploaded shoe to display on index after being created */}
          <Grid style={styles.shoesIndex.grid} columns={4} stackable={true}>
            <ShoeCells />
          </Grid>
        </Container>
      </ProfileMenu>
    );
  }
}

export default graphql(AllShoesQuery)(Shoes);
