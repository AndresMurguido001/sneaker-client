import React, { Component } from "react";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Consumer } from "../App";
import animation from "../animation";

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
  openMenu = React.createRef();

  handleButtonClick = () => {
    this.setState({ visible: !this.state.visible });
    animation.profileMenuOpen(this.openMenu.current.children[0]);
  };

  handleSidebarHide = () => {
    this.setState({ visible: false });
    animation.profileMenuClose(this.openMenu.current.children[0]);
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
        zIndex: "3"
      }
    };
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
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
          <div ref={this.openMenu}>
            <Icon
              size="huge"
              id="sideMenuIcon"
              style={styles.icon}
              name="chevron right"
              onClick={this.handleButtonClick}
            />
          </div>
          <Sidebar.Pusher dimmed={visible}>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
