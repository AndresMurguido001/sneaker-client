import React from "react";
import { Grid, Image, Card, Icon } from "semantic-ui-react";
const ShoeCell = ({
  shoe: { photos, model, brand, description, numberOfLikes, size }
}) => (
  <Grid.Column>
    <Card>
      <Image size="small" src={photos ? photos[0] : null} />
      <Card.Content>
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
