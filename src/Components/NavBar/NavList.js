import React from 'react';
import { Navwrap } from '../../styles/Home/Nav';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';


const NavList = ({ isOpen, userId }) => {

    let NavLink = ({ path, icon, user, content }) => {
        if (user) {
                return (
                    <li>
                        <Link to={`${path}/${user}`}>
                            <Icon name={`${icon}`} />
                            <span>{content}</span>
                        </Link>
                    </li>
                )
            }
 
        return (
                <li>
                    <Link to={path}>
                        <Icon name={`${icon}`} />
                        <span>{content}</span>
                    </Link>
                </li>
        )
    }
    console.log(userId)
    return (
        <Navwrap>
              <ul className={isOpen ? 'active' : 'disabled'}>
                  <NavLink path={"/"} icon="home" content="Home" />
                  <NavLink path={"#"} icon="info" content="About" />
                  <NavLink path={"/shoes"} icon="shopping bag" content="Shop" />
                  { userId ? (<NavLink path={"/profile"} user={userId} icon="user circle" content="Profile" />) : false }
              </ul> 
            </Navwrap>
            )
}
export default NavList;