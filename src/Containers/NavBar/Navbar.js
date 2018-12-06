import React from "react";
import { MenuBtn } from "../../styles/Home/Nav";
import { LoginSignup } from "../../Components/NavBar/LoginSignup";
// import { Consumer } from '../../App'
import NavList from "../../Components/NavBar/NavList";

export class Navbar extends React.Component {
  state = {
    isOpen: false,
    openLoginModal: false,
    openRegisterModal: false,
  }
    handleLoginClick = () => this.setState({ openLoginModal: !this.state.openLoginModal });
    handleRegisterClick = () => this.setState({ openRegisterModal: !this.state.openRegisterModal });
    handleRegisterSuccess = () => this.setState({ openRegisterModal: false })
  render(){
    let { openLoginModal, openRegisterModal, isOpen, currentUserId } = this.state;
    let { handleLoginClick, handleRegisterClick, handleRegisterSuccess } = this
        
    return(
                <div>
                  <MenuBtn name="angle down" circular onClick={ () => {
                      this.setState({
                        isOpen: !isOpen
                      })
                    }} />
                    {/* Turn NavWrap To NavList Component */}
                    
                  <NavList userId={currentUserId} isOpen={isOpen} />
                  { currentUserId ? false : 
                    (
                      <LoginSignup 
                      handleLoginClick={handleLoginClick} 
                      handleRegisterClick={handleRegisterClick}
                      openLoginModal={openLoginModal}
                      openRegisterModal={openRegisterModal}
                      handleRegisterSuccess={handleRegisterSuccess} />
                      )
                  }

              </div>
              )
      }
}
