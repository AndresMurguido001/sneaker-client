import React, { Component } from "react";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Consumer } from "../App";
import { IconWrapper, SideBarWrapper } from "../styles/ShoesIndex";

const IconWithLink = () => (
  <Consumer>
    {value => (
      <Link to={`/${value}`}>
        <Menu.Item>
          <Icon name="user" />
          Profile
        </Menu.Item>
      </Link>
    )}
  </Consumer>
);

export default class ProfileMenu extends Component {
  state = { visible: false };

  handleButtonClick = () => {
    this.setState({ visible: !this.state.visible });
  };

  handleSidebarHide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    let { isInverted } = this.props;
    let styles = {
      icon: {
        color: isInverted ? "black" : "#fff",
        marginLeft: "40px",
        marginTop: "20px",
        borderRadius: "50%",
        perspective: "800",
        position: "absolute",
        zIndex: "5"
      },
      fullScreen: {
        height: "100%",
        width: "100%",
        position: "absolute",
        left: 0,
        top: 0
      }
    };
    return (
      <SideBarWrapper>
        <Sidebar.Pushable style={styles.fullScreen} as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="thin"
          >
            <Link to="/">
              <Menu.Item>
                <Icon name="home" />
                Home
              </Menu.Item>
            </Link>
            <Link to="/shoes">
              <Menu.Item>
                <Icon name="shop" />
                Shop Shoes
              </Menu.Item>
            </Link>
            <IconWithLink />
          </Sidebar>
          <IconWrapper visible={this.state.visible}>
            <Icon
              size="huge"
              id="sideMenuIcon"
              style={styles.icon}
              name="chevron right"
              onClick={this.handleButtonClick}
            />
          </IconWrapper>
          <div>
            <Sidebar.Pusher
              children={this.props.children}
              style={styles.fullHeight}
              dimmed={visible}
            />
          </div>
        </Sidebar.Pushable>
      </SideBarWrapper>
    );
  }
}
