import React from "react";
import { Image, Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  LikeShoeMutation,
  DeleteShoeMutation,
  meQuery,
  AllShoesQuery
} from "../ApolloService/ApolloRequests";
import { graphql, compose } from "react-apollo";
import { Message } from "semantic-ui-react";
import EvenImage from "../Components/EvenImage";
import ReactStars from "react-stars";

class ShoeCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeError: ""
    };
  }

  onLikeClick = async () => {
    console.log("ON LIKE CLICK");
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
  // Figure out where to add delete shoe mutation
  // onDeleteClick = async () => {
  //   const {
  //     shoe: { id }
  //   } = this.props;
  //   const { ok, errors } = await this.props.mutate({
  //     variables: {
  //       shoeId: id
  //     },
  //     update: (proxy, { data: { deleteShoe } }) => {
  //       const { ok, errors } = deleteShoe;
  //       const data = proxy.readQuery({
  //         query: meQuery,
  //         variables: { userId: this.props.currentUser }
  //       });
  //     }
  //   });
  //   if (ok) {
  //     console.log("Shoes Deleted");
  //   } else {
  //     console.log("ERROR: ", errors);
  //   }
  // };

  render() {
    let {
      shoe: {
        id,
        photos,
        model,
        brand,
        description,
        numberOfLikes,
        size,
        owner,
        averageRating
      },
      profileImg,
      usersProfile
    } = this.props;
    let primaryPhoto = photos ? photos[0] : null;

    return (
      <div style={style.cardContainer}>
        <Card style={{ position: "relative" }} raised>
          {this.state.likeError && (
            <Message error content={this.state.likeError} />
          )}
          {id ? (
            <Link to={`/shoes/${id}`}>
              <EvenImage src={primaryPhoto} />
            </Link>
          ) : (
            <EvenImage src={primaryPhoto} />
          )}
          <Card.Content>
            {usersProfile ? (
              <Icon size="big" style={{ float: "right" }} name="user circle" />
            ) : (
              <Link to={`/${owner.id}`}>
                {profileImg ? (
                  <Image floated="right" avatar src={profileImg} />
                ) : (
                  <Icon
                    size="big"
                    name="user circle outline"
                    style={{ float: "right ", color: "black" }}
                  />
                )}
              </Link>
            )}
            <Card.Header>{model}</Card.Header>
            <Card.Meta style={{ display: "flex" }}>
              {brand}
              <span style={{ marginLeft: "1rem" }}>
                <ReactStars count={5} value={averageRating} edit={false} />
              </span>
            </Card.Meta>
            <Card.Description style={{ overflowY: "hidden" }}>
              <p>{description}</p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {usersProfile ? (
              <React.Fragment>
                <Icon
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem"
                  }}
                  name="delete"
                  color="red"
                  circular
                />
                <Icon name="like" color="red" />
              </React.Fragment>
            ) : (
              <a>
                <Icon name="like" onClick={this.onLikeClick} />
              </a>
            )}
            {numberOfLikes}
            <span style={{ float: "right" }}>{`Size: ${size}`}</span>
          </Card.Content>
        </Card>
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
