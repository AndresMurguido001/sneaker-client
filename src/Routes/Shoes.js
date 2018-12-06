import React from "react";
import { graphql, compose } from "react-apollo";
import { AllShoesQuery } from "../ApolloService/ApolloRequests";
import bg from '../images/mainOneBg.jpg'
import {
  Container,
  Dimmer,
  Loader,
  // Header,
  Grid,
  // Form
} from "semantic-ui-react";
import ShoeCell from "../Components/ShoeCell";
import { Consumer } from "../App";
import { withRouter } from "react-router-dom";
import { HeadingSecondary, Section, Content } from "../styles/Home/Home";

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
      } else {
        return (<h2>NoShoes</h2>)
      }
     
    };
    // let { searchQuery } = this.state;
    return (
    
      <Section background={bg}>
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
            
              <Content centered bordered>
                  <HeadingSecondary lineHeight={"10rem"} bordered>
                   SHOP SNKRS 
                  </HeadingSecondary>
                </Content>
              

            {/* Figure Out how to get uploaded shoe to display on index after being created */}
          </Container>
          <Grid columns="4">
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
