import React from "react";
import { Grid, Image, Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
const ShoeCell = ({
  shoe: { photos, model, brand, description, numberOfLikes, size, owner },
  profileImg
}) => (
  <Grid.Column>
    <Card>
      <Image size="medium" centered src={photos ? photos[0] : null} />
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
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="like" />
          {numberOfLikes}
        </a>
        <span style={{ float: "right" }}>{`Size: ${size}`}</span>
      </Card.Content>
    </Card>
  </Grid.Column>
);
export default ShoeCell;
