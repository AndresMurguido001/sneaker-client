import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import {
  Container,
  Dimmer,
  Loader,
  Header,
  Grid,
  Form
} from "semantic-ui-react";
import ShoeCell from "../Components/ShoeCell";
import ProfileMenu from "../Components/ProfileMenu.js";
import { Consumer } from "../App";
import { withRouter } from "react-router-dom";
//Style
import NoShoes from "../Components/NoShoes";
import styles from "../styles/Shoes";
import styled from "styled-components";
// Create SearchBar Component

const ShoesBackground = styled.div`
  background-color: rgba(16, 12, 32, 0.7);
`;
export const AllShoesQuery = gql`
  query($searchBy: String) {
    getAllShoes(searchBy: $searchBy) {
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
      averageRating
    }
  }
`;
class Shoes extends React.Component {
  state = {
    searching: false,
    searchQuery: ""
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };
  handleSubmit = () => {
    return this.props.history.push(`/shoes/search/${this.state.searchQuery}`);
  };

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

    let ShoeCells = () => {
      if (getAllShoes.length > 0) {
        return (
          <Consumer>
            {value =>
              getAllShoes.map((shoe, index) => (
                <ShoeCell
                  currentUser={value}
                  key={`shoe-${shoe.model}-${index}`}
                  profileImg={shoe.owner.profilePic}
                  shoe={shoe}
                  index={index}
                />
              ))
            }
          </Consumer>
        );
      }
      return <NoShoes />;
    };
    let { searchQuery } = this.state;
    return (
      <ProfileMenu>
        <ShoesBackground>
          <Container fluid>
            <div
              ref={el => (this.mainImage = el)}
              style={styles.shoesIndex.mainBgLg}
            >
              <Form onSubmit={this.handleSubmit} style={styles.searchBar}>
                <Form.Input
                  icon="search"
                  iconPosition="left"
                  placeholder="Search our shoes..."
                  value={searchQuery}
                  onChange={this.handleChange}
                />
              </Form>
              <div
                style={styles.shoesIndex.headerWrap}
                ref={el => (this.headerWrap = el)}
              >
                <Header
                  style={styles.shoesIndex.primaryHeader}
                  inverted
                  textAlign="left"
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
            </div>

            {/* Figure Out how to get uploaded shoe to display on index after being created */}
          </Container>
          <Grid style={style.gridContainer} columns="4">
            <ShoeCells />
          </Grid>
        </ShoesBackground>
      </ProfileMenu>
    );
  }
}
let style = {
  flex: {
    display: "flex",
    width: "100%",
    float: "left",
    justifyContent: "center",
    padding: "2rem 0",
    margin: "2rem 0",
    background:
      "linear-gradient(to bottom, rgba(50,166,255,1) 0%,rgba(156,223,229,1) 50%,rgba(255,255,255,1) 100%)",
    flexWrap: "wrap"
  },
  gridContainer: {
    margin: "auto",
    width: "90%",
    height: "100vh"
  }
};

export default compose(
  graphql(AllShoesQuery, {
    options: ({
      match: {
        params: { searchQuery }
      }
    }) => ({
      variables: {
        searchBy: searchQuery
      }
    })
  }),
  withRouter
)(Shoes);
