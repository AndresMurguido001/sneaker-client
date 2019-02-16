import React from "react";
import { graphql, compose } from "react-apollo";
import { AllShoesQuery } from "../ApolloService/ApolloRequests";
import bg from "../images/mainOneBg.jpg";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import ShoeCell from "../Components/ShoeCell";
import { withRouter } from "react-router-dom";
import { Section, HeadingPrimary } from "../styles/Home/Home";
import { AuthConsumer } from "../Context/AuthContext";
import styled from "styled-components";

export const ShoeGrid = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 2rem 0;
  justify-content: space-between;
`;
export const ShoeGridWrap = styled.div`
  display: flex;
  margin: 0 4.5rem;
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

    let ShoeCells = ({ shoes }) => (
      <AuthConsumer>
        {({ userId }) =>
          shoes.map((shoe, index) => (
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
          {/* TODO: SEARCHBAR */}
          <HeadingPrimary lineHeight={"10rem"} bordered>
            SHOP <br />
            SNKRS
          </HeadingPrimary>
        </Container>
        <ShoeGridWrap>
          <ShoeGrid>
            <ShoeCells shoes={getAllShoes ? getAllShoes : []} />
          </ShoeGrid>
        </ShoeGridWrap>
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
