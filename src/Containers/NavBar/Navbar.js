import React from "react";
import { MenuBtn } from "../../styles/Home/Nav";
import { LoginSignup } from "../../Components/NavBar/LoginSignup";
import { Consumer } from '../../App'

import NavList from "../../Components/NavBar/NavList";

export class Navbar extends React.Component {
  state = {
    isOpen: false,
    openLoginModal: false,
    openRegisterModal: false,
    currentUser: 0 
  }
    handleLoginClick = () => this.setState({ openLoginModal: !this.state.openLoginModal });
    handleRegisterClick = () => this.setState({ openRegisterModal: !this.state.openRegisterModal });
    handleRegisterSuccess = () => this.setState({ openRegisterModal: false })
    handleLoginSuccess = (id) => this.setState({ currentUser: id })

  render(){
    let { openLoginModal, openRegisterModal, isOpen, currentUser } = this.state;
    let { handleLoginClick, handleRegisterClick, handleRegisterSuccess, handleLoginSuccess } = this
    return(
                <Consumer>
                  {(userId) => (
                    <div>
                        <MenuBtn name="angle down" circular onClick={ () => {
                            this.setState({
                              isOpen: !isOpen
                            })
                          }} />
                        <NavList userId={userId || currentUser} isOpen={isOpen} />
                        <LoginSignup 
                            handleLoginClick={handleLoginClick} 
                            handleRegisterClick={handleRegisterClick}
                            openLoginModal={openLoginModal}
                            openRegisterModal={openRegisterModal}
                            handleRegisterSuccess={handleRegisterSuccess}
                            userId={userId || currentUser}
                            handleLoginSuccess={handleLoginSuccess}
                            />
                    </div>
                   )
                  }
              </Consumer>
              )
      }
}
