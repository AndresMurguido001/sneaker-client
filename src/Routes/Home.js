import React from "react";
import { HomeNav } from "../Components/Navbar";
import {
  Container,
  Header,
  Button,
  ButtonGroup,
  ButtonOr
} from "semantic-ui-react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import styled from "styled-components";
import bg from "../images/mainOneBg.jpg";

let Background = styled.div`
  height: 100vh;
  background: linear-gradient(
      45deg,
      rgba(102, 54, 247, 0.5) 0%,
      rgba(230, 40, 198, 0.3) 100%
    ),
    url(${bg});
  background-position: center;
  background-size: cover;
  padding-top: 300px;
  clip-path: polygon(0 0, 100% 10%, 100% 100%, 0 90%);
`;

class Home extends React.Component {
  state = {
    openLoginModal: false,
    openRegisterModal: false
  };

  render() {
    let { openLoginModal, openRegisterModal } = this.state;

    return (
      <Container textAlign="center" fluid>
        <HomeNav />

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
          <Header
            as="h1"
            style={{ color: "#fff", fontSize: "5rem", wordWrap: "break-word" }}
          >
            Sneaker HeadShop
          </Header>
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
        </Background>
      </Container>
    );
  }
}

export default Home;
