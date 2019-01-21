import React from "react";
import {
  LikeShoeMutation,
  AllShoesQuery
} from "../ApolloService/ApolloRequests";
import { graphql, compose } from "react-apollo";
import ShoeCellContent from "./ShoeCellContent";

class ShoeCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeError: ""
    };
  }

  onLikeClick = async () => {
    await this.props.mutate({
      variables: {
        userId: this.props.currentUser,
        shoeId: this.props.shoe.id
      },
      update: (proxy, { data: { likeShoe } }) => {
        const { ok, errors } = likeShoe;
        const data = proxy.readQuery({ query: AllShoesQuery });
        if (ok) {
          data.getAllShoes[this.props.index].numberOfLikes += 1;
          proxy.writeQuery({ query: AllShoesQuery, data });
        }
        if (errors) {
          let likeError = errors[0].message;
          this.setState({ likeError });
          setTimeout(() => {
            this.setState({ likeError: "" });
          }, 5000);
        }
      }
    });
  };

  render() {
    let { shoe, profileImg, usersProfile, userId } = this.props;
    let primaryPhoto = shoe.photos ? shoe.photos[0] : null;

    return (
      <div style={style.cardContainer}>
        <ShoeCellContent
          onLikeClick={this.onLikeClick}
          likeError={this.state.likeError}
          shoe={shoe}
          primaryPhoto={primaryPhoto}
          profileImg={profileImg}
          usersProfile={usersProfile}
          userId={userId}
        />
      </div>
    );
  }
}
let style = {
  cardExtra: {
    padding: "10px"
  },
  cardContainer: {
    margin: "1rem 0"
  }
};
export default compose(graphql(LikeShoeMutation))(ShoeCell);
