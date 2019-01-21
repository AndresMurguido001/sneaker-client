import React from "react";
import { LoginSignup } from "../Components/NavBar/LoginSignup";
//import { Consumer } from "../../App";
import { Menu, Icon, Label } from "semantic-ui-react";

import NavList from "../Components/NavBar/NavList";
import { AuthConsumer } from "../Context/AuthContext";
import CartContainer from "./CartContainer";

export class Navbar extends React.Component {
  state = {
    openLoginModal: false,
    openRegisterModal: false,
    cartOpen: false,
    numberOfItemsInCart: 0
  };
  handleLoginClick = () =>
    this.setState({ openLoginModal: !this.state.openLoginModal });
  handleRegisterClick = () =>
    this.setState({ openRegisterModal: !this.state.openRegisterModal });
  handleRegisterSuccess = () => this.setState({ openRegisterModal: false });

  handleCartClick = () => this.setState({ cartOpen: !this.state.cartOpen });

  handleQuantityChange = qty => this.setState({ numberOfItemsInCart: qty });

  render() {
    let { openLoginModal, openRegisterModal } = this.state;
    let { handleLoginClick, handleRegisterClick, handleRegisterSuccess } = this;

    return (
      <AuthConsumer>
        {({ userId }) => (
          <React.Fragment>
            <Menu
              fluid
              style={{
                position: "absolute",
                padding: "1rem 0",
                backgroundColor: "rgba(0, 0, 0, 0.25)"
              }}
            >
              <React.Fragment>
                <NavList userId={userId} />
                {!userId && (
                  <Menu.Item position="right">
                    <LoginSignup
                      handleLoginClick={handleLoginClick}
                      handleRegisterClick={handleRegisterClick}
                      openLoginModal={openLoginModal}
                      openRegisterModal={openRegisterModal}
                      handleRegisterSuccess={handleRegisterSuccess}
                    />
                  </Menu.Item>
                )}
              </React.Fragment>
              {userId !== 0 && (
                <Icon.Group
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "50%",
                    transform: "translate(-100%, -50%)"
                  }}
                >
                  <Icon
                    onClick={this.handleCartClick}
                    inverted
                    name="shopping cart"
                    size="big"
                  />
                  <Label
                    floating
                    color="red"
                    circular
                    content={this.state.numberOfItemsInCart}
                    size="mini"
                  />
                </Icon.Group>
              )}
            </Menu>
            <CartContainer
              onCloseClick={this.handleCartClick}
              cartOpen={this.state.cartOpen}
              userId={userId}
              onQuantityChange={this.handleQuantityChange}
            />
          </React.Fragment>
        )}
      </AuthConsumer>
    );
  }
}
