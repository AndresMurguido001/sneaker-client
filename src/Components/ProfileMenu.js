import React, { Component } from "react";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Consumer } from "../App";

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

  handleButtonClick = () => this.setState({ visible: !this.state.visible });

  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
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

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <Icon
                size="huge"
                id="sideMenuIcon"
                style={styles.icon}
                bordered
                name="arrow alternate circle right"
                onClick={this.handleButtonClick}
              />

              {this.props.children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
let styles = {
  icon: {
    color: "#fff",
    borderRadius: "50%",
    backgroundColor: "#00c78f",
    position: "absolute",
    top: "50px",
    left: "20px",
    zIndex: "3"
  }
};
