import React from "react";
import { Menu, Button } from "semantic-ui-react";
import Login from "../../Components/Login";
import Register from "../../Components/Register";

export const LoginSignup = ({
  openLoginModal,
  openRegisterModal,
  handleLoginClick,
  handleRegisterClick,
  handleRegisterSuccess
}) => (
  <React.Fragment>
    <Menu.Item>
      <Button primary onClick={() => handleRegisterClick()}>
        Sign up
      </Button>
    </Menu.Item>

    <Menu.Item>
      <Button onClick={() => handleLoginClick()}>Log-in</Button>
    </Menu.Item>

    <Login key={1} open={openLoginModal} onClose={() => handleLoginClick()} />

    <Register
      open={openRegisterModal}
      onClose={() => handleRegisterClick()}
      onRegistrationSuccess={() => handleRegisterSuccess()}
    />
  </React.Fragment>
);
