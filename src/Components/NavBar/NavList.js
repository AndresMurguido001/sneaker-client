import React from "react";
import { Icon, Menu } from "semantic-ui-react";

const linkStyle = {
  color: "#fff"
};

let NavLink = ({ path, icon, user, content }) =>
  user ? (
    <Menu.Item style={linkStyle} href={`${path}/${user}`}>
      <Icon name={`${icon}`} />
      <span>{content}</span>
    </Menu.Item>
  ) : (
    <Menu.Item style={linkStyle} href={path}>
      <Icon name={`${icon}`} />
      <span>{content}</span>
    </Menu.Item>
  );
const NavList = ({ userId }) => (
  <React.Fragment>
    <NavLink path={"/"} icon="home" content="Home" />
    <NavLink path={"#"} icon="info" content="About" />
    <NavLink path={"/shoes"} icon="shopping bag" content="Shop" />
    {userId ? (
      <NavLink
        path={"/profile"}
        user={userId}
        icon="user circle"
        content="Profile"
      />
    ) : (
      false
    )}
  </React.Fragment>
);
export default NavList;
