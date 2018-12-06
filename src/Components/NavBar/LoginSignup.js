import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { LoginSignupMenu } from '../../styles/Home/Nav'
import Login from '../../Components/Login'
import Register from '../../Components/Register'

export const LoginSignup = ({ 
    openLoginModal, 
    openRegisterModal, 
    handleLoginClick, 
    handleRegisterClick,
    handleRegisterSuccess,
    handleLoginSuccess,
    userId
}) => !userId && (
    <React.Fragment>
    <LoginSignupMenu borderless inverted floated="right">
    <Menu.Item>
      <Button 
      primary
      onClick={() => handleRegisterClick()}
      >Sign up</Button>
    </Menu.Item>

    <Menu.Item>
      <Button
      onClick={() => handleLoginClick()}
      >Log-in</Button>
    </Menu.Item>
  </LoginSignupMenu>
        <Login
            key={1}
            open={openLoginModal}
            onClose={() => handleLoginClick()}
            onSuccess={(id) => handleLoginSuccess(id)}
          />
          
          <Register
            open={openRegisterModal}
            onClose={() => handleRegisterClick()}
            onRegistrationSuccess={() => handleRegisterSuccess()}
          />
    </React.Fragment>
)