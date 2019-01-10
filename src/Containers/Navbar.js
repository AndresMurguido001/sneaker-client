import React from "react";
import { LoginSignup } from "../Components/NavBar/LoginSignup";
//import { Consumer } from "../../App";
import { Menu } from "semantic-ui-react";

import NavList from "../Components/NavBar/NavList";
import { AuthConsumer } from "../Context/AuthContext";

export class Navbar extends React.Component {
  state = {
    openLoginModal: false,
    openRegisterModal: false
  };
  handleLoginClick = () =>
    this.setState({ openLoginModal: !this.state.openLoginModal });
  handleRegisterClick = () =>
    this.setState({ openRegisterModal: !this.state.openRegisterModal });
  handleRegisterSuccess = () => this.setState({ openRegisterModal: false });

  render() {
    let { openLoginModal, openRegisterModal } = this.state;
    let { handleLoginClick, handleRegisterClick, handleRegisterSuccess } = this;

    return (
      <Menu
        fluid
        style={{
          position: "absolute",
          padding: "1rem 0",
          backgroundColor: "rgba(0, 0, 0, 0.25)"
        }}
      >
        <AuthConsumer>
          {({ userId }) => (
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
          )}
        </AuthConsumer>
      </Menu>
    );
  }
}
