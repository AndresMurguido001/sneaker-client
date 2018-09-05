import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

let NavWrap = styled.div`
  width: 100vw;
  height: 10rem;
  position: absolute;
  top: 0;
`;
let Nav = styled.ul`
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
  height: 100%;
  width: 50%;
  float: right;
  list-style: none;
`;
let NavItem = styled.li`
  color: #fff;
  font-size: 1.5em;
`;

export const HomeNav = () => {
  let token = localStorage.getItem("token");
  let currentUserId;
  if (token) {
    let {
      user: { id }
    } = jwt_decode(token);
    currentUserId = id;
  }
  return (
    <NavWrap>
      <Nav>
        <Link to="/">
          <NavItem>Home</NavItem>
        </Link>
        <Link to="/shoes">
          <NavItem>Shop</NavItem>
        </Link>
        <Link to={`/${currentUserId}`}>
          <NavItem>Profile</NavItem>
        </Link>
      </Nav>
    </NavWrap>
  );
};

// export const HomeNav = () => {
//   let token = localStorage.getItem("token");
//   let currentUserId;
//   if (token) {
//     let {
//       user: { id }
//     } = jwt_decode(token);
//     currentUserId = id;
//   }
//   return (
//     <Grid
//       columns={token ? 3 : 2}
//       style={{
//         width: "50%",
//         float: "right",
//         fontSize: "20px",
//         padding: "10px 20px"
//       }}
//       textAlign="right"
//     >
//       <Grid.Row>
//         <Grid.Column>
//           <Link style={{ textDecoration: "none", color: "#000" }} to="/">
//             {" "}
//             <Icon name="home" />
//             Home{" "}
//           </Link>
//         </Grid.Column>
//         {token ? (
//           <Grid.Column>
//             <Link
//               style={{ textDecoration: "none", color: "#000" }}
//               to={`/${currentUserId}`}
//             >
//               <Icon name="user circle outline" />
//               Profile
//             </Link>
//           </Grid.Column>
//         ) : null}
//         <Grid.Column>
//           <Link style={{ textDecoration: "none", color: "#000" }} to="/shoes">
//             <Icon name="shop" />
//             Shop
//           </Link>
//         </Grid.Column>
//       </Grid.Row>
//     </Grid>
//   );
// };
