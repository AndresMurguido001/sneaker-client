import React from "react";
import { Card, Message, Icon, Image } from "semantic-ui-react";
import DeleteShoeWrapper from "../Containers/DeleteShoe";
import EvenImage from "./utils/EvenImage";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ControlledContent = styled(Card.Content)`
  height: 3rem;
  display: block;
  position: relative;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(transparent 50%, white);
  }
`;

export default ({
  shoe: {
    id,
    model,
    brand,
    description,
    numberOfLikes,
    size,
    owner,
    averageRating
  },
  profileImg,
  usersProfile,
  primaryPhoto,
  onLikeClick,
  likeError,
  userId
}) => (
  <Card style={{ position: "relative" }} raised>
    {likeError && <Message error content={likeError} />}
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
      <ControlledContent>
        <p>{description}</p>
      </ControlledContent>
    </Card.Content>
    <Card.Content extra>
      {usersProfile ? (
        <React.Fragment>
          <DeleteShoeWrapper userId={userId} shoeId={id} />
          <Icon name="like" color="red" />
        </React.Fragment>
      ) : (
        <a>
          <Icon name="like" onClick={onLikeClick} />
        </a>
      )}
      {numberOfLikes}
      <span style={{ float: "right" }}>{`Size: ${size}`}</span>
    </Card.Content>
  </Card>
);
