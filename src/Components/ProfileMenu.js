import React from "react";

import { Icon } from "semantic-ui-react";

class ProfileMenu extends React.Component {
  state = {
    active: false
  };
  render() {
    return (
      <div>
        <Icon
          name="arrow circle left"
          size="big"
          onClick={() => this.setState({ active: !this.state.active })}
          circular
          inverted
          style={{ float: "right", position: "relative", zIndex: 3 }}
        />

        <div className={this.state.active ? "menu active" : "menu"}>
          <ul className="menuList">
            <li className="listItem">Home</li>
            <li className="listItem">Shoes</li>
            <li className="listItem">Search</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileMenu;
