import React from "react";
import { graphql, compose } from "react-apollo";
import { AllShoesQuery } from "../ApolloService/ApolloRequests";
import bg from "../images/mainOneBg.jpg";
import { Container, Dimmer, Loader, Grid } from "semantic-ui-react";
import ShoeCell from "../Components/ShoeCell";
import { withRouter } from "react-router-dom";
import { Section, HeadingPrimary } from "../styles/Home/Home";
import { AuthConsumer } from "../Context/AuthContext";

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

    let ShoeCells = () =>
      getAllShoes.length > 0 && (
        <AuthConsumer>
          {({ userId }) =>
            getAllShoes.map((shoe, index) => (
              <ShoeCell
                currentUser={userId}
                key={`shoe-${shoe.model}-${index}`}
                profileImg={shoe.owner.profilePic}
                shoe={shoe}
                index={index}
              />
            ))
          }
        </AuthConsumer>
      );

    // let { searchQuery } = this.state;
    return (
      <Section style={{ backgroundAttachment: "fixed" }} background={bg}>
        <Container>
          {/* TODO: Put searchbar into its own component */}
          {/* <Form onSubmit={this.handleSubmit} >
                <Form.Input
                  icon="search"
                  iconPosition="left"
                  placeholder="Search our shoes..."
                  value={searchQuery}
                  onChange={this.handleChange}
                />
              </Form> */}

          <HeadingPrimary lineHeight={"10rem"} bordered>
            SHOP <br />
            SNKRS
          </HeadingPrimary>
        </Container>
        <Grid style={{ margin: "5rem 3rem" }} columns="4">
          <ShoeCells />
        </Grid>
      </Section>
    );
  }
}

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
