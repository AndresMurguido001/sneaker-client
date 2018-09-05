import React from "react";
import { Grid, Image, Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { AllShoesQuery } from "../Routes/Shoes";
import { Message } from "semantic-ui-react";

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
  state = {
    likeError: ""
  };
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
      profileImg
    } = this.props;
    let primaryPhoto = photos ? photos[0] : null;
    let secondaryPhotos = photos.filter(
      (photo, index) => (index === 0 ? false : photo)
    );
    return (
      <Grid.Column>
        <Card raised>
          {this.state.likeError && (
            <Message error content={this.state.likeError} />
          )}
          {id ? (
            <Link to={`/shoes/${id}`}>
              <Image size="medium" centered src={primaryPhoto} />
            </Link>
          ) : (
            <Image size="medium" centered src={primaryPhoto} />
          )}
          <Card.Content>
            {profileImg ? (
              <Link to={`/${owner.id}`}>
                <Image floated="right" avatar src={profileImg} />
              </Link>
            ) : (
              <Icon size="big" style={{ float: "right" }} name="user circle" />
            )}
            <Card.Header>{model}</Card.Header>
            <Card.Meta>{brand}</Card.Meta>
            <Card.Description>
              <p>{description}</p>
              {secondaryPhotos
                ? secondaryPhotos.map((photo, index) => (
                    <Image
                      key={`${photo}-${index}-shoes-display`}
                      src={photo}
                      size="tiny"
                    />
                  ))
                : null}
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
      </Grid.Column>
    );
  }
}
export default graphql(LikeShoeMutation)(ShoeCell);
