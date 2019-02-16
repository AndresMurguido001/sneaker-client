import React from "react";
import { ShoeGrid, ShoeGridWrap } from "../Routes/Shoes";
import ShoeCell from "./ShoeCell";
import { HeadingSecondary } from "../styles/Home/Home";

const UsersShoes = ({ profilePic, shoes, userId }) => {
  if (shoes.length > 0) {
    return (
      <React.Fragment>
        <HeadingSecondary underlined>Your Shoes</HeadingSecondary>
        <ShoeGridWrap>
          <ShoeGrid>
            {shoes.map((shoe, index) => {
              return (
                <ShoeCell
                  key={`shoe-${shoe.model}-${index}`}
                  profileImg={profilePic}
                  shoe={shoe}
                  userId={userId}
                  usersProfile
                />
              );
            })}
          </ShoeGrid>
        </ShoeGridWrap>
      </React.Fragment>
    );
  }
  return (
    <div>
      <HeadingSecondary underlined>No shoes</HeadingSecondary>
    </div>
  );
};
export default UsersShoes;
