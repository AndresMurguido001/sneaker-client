import React, { Component } from "react";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
            <Link to={`/${this.props.currentUserId}`}>
              <Menu.Item>
                <Icon name="user" />
                Profile
              </Menu.Item>
            </Link>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <Icon
                size="huge"
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
