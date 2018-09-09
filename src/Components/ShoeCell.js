import React from "react";
import { Grid, Image, Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { AllShoesQuery } from "../Routes/Shoes";
import { Message } from "semantic-ui-react";
import EvenImage from "../Components/EvenImage";
import CardAnimateWrap from "./CardAnimateWrap";

let LikeShoeMutation = gql`
  mutation($shoeId: Int!, $userId: Int!) {
    likeShoe(userId: $userId, shoeId: $shoeId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
class ShoeCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeError: "",
      tooLarge: false
    };
    this.cardWrapper = React.createRef();
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
  getSize = () => {
    if (this.cardWrapper.current.offsetHeight > 327) {
      this.setState({ tooLarge: true });
    }
  };

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
        owner
      },
      profileImg,
      index
    } = this.props;
    let primaryPhoto = photos ? photos[0] : null;
    let { tooLarge } = this.state;
    return (
      <Grid.Column>
        <CardAnimateWrap index={index}>
          <div ref={this.cardWrapper} onLoad={this.getSize}>
            <Card style={tooLarge ? style.tooLarge : null} raised>
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
                {profileImg ? (
                  <Link to={`/${owner.id}`}>
                    <Image floated="right" avatar src={profileImg} />
                  </Link>
                ) : (
                  <Icon
                    size="big"
                    style={{ float: "right" }}
                    name="user circle"
                  />
                )}
                <Card.Header>{model}</Card.Header>
                <Card.Meta>{brand}</Card.Meta>
                <Card.Description>
                  <p>{description}</p>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="like" onClick={this.onLikeClick} />
                </a>
                {numberOfLikes}
                <span style={{ float: "right" }}>{`Size: ${size}`}</span>
              </Card.Content>
            </Card>
          </div>
        </CardAnimateWrap>
      </Grid.Column>
    );
  }
}
let style = {
  tooLarge: {
    height: "327px"
  }
};
export default graphql(LikeShoeMutation)(ShoeCell);
