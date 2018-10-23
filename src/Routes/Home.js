import React from "react";
import { HomeNav } from "../Components/Navbar";
import { Container, Button, ButtonGroup, ButtonOr } from "semantic-ui-react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import {
  Background,
  PrimaryHeader,
  SecondaryHeader,
  Wrap
} from "../styles/Home";
import MidSection from "../Components/HomeMidSection";

let MainContainer = props => (
  <Wrap>
    <Container textAlign="center" fluid>
      {props.children}
    </Container>
  </Wrap>
);

class Home extends React.Component {
  state = {
    openLoginModal: false,
    openRegisterModal: false
  };

  render() {
    let { openLoginModal, openRegisterModal } = this.state;

    return (
      <MainContainer>
        <HomeNav
          handleLoginClick={() =>
            this.setState({ openLoginModal: !openLoginModal })
          }
        />
        <Background>
          <Login
            key={1}
            open={openLoginModal}
            onClose={() => {
              this.setState({ openLoginModal: !this.state.openLoginModal });
            }}
          />
          ;
          <Register
            open={openRegisterModal}
            onClose={() => this.setState({ openRegisterModal: false })}
            onRegistrationSuccess={() => {
              this.setState({ openLoginModal: !this.state.openLoginModal });
            }}
          />
          <PrimaryHeader>Sneaker HeadShop</PrimaryHeader>
          <ButtonGroup style={{ width: "50%" }}>
            <Button
              primary
              onClick={() => {
                this.setState({
                  openLoginModal: !openLoginModal
                });
              }}
            >
              Login
            </Button>
            <ButtonOr />
            <Button
              secondary
              onClick={() => {
                this.setState({
                  openRegisterModal: !openRegisterModal
                });
              }}
            >
              Register
            </Button>
          </ButtonGroup>
          <SecondaryHeader>Selling shoes made easy</SecondaryHeader>
        </Background>

        <MidSection />
      </MainContainer>
    );
  }
}

export default Home;
