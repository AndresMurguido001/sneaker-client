import React from "react";
import {
  Card,
  Image,
  Label,
  Icon,
  Segment,
  Button,
  Message
} from "semantic-ui-react";

export default ({ data: { shoes, quantity, total } }) => {
  if (shoes) {
    return (
      <Card.Group style={{ paddingTop: "1rem" }} centered>
        {shoes.map(shoe => (
          <Card key={`${shoe.model}-${shoe.brand}-${shoe.id}`}>
            <Card.Content>
              <Image src={shoe.photos[0]} floated="left" size="tiny" />
              <Card.Header>{shoe.brand}</Card.Header>
              <Card.Meta>{shoe.model}</Card.Meta>
              <Card.Meta>Size: {shoe.size}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Label.Group
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Label>
                  Qty.
                  {/* This needs to be SHOE.Quantity */}
                  {/* <Label.Detail>{quantity}</Label.Detail> */}
                </Label>
                <Label tag>
                  <Icon name="dollar sign" />
                  {shoe.price}
                </Label>
              </Label.Group>
            </Card.Content>
          </Card>
        ))}
        <Segment inverted>
          <Card>
            <Card.Content>
              <Label.Group
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Label.Group
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Label color="green" size="medium">
                    Qty.
                  </Label>
                  <Label color="green" size="medium">
                    <Icon name="hashtag" />
                    <Label.Detail>{quantity}</Label.Detail>
                  </Label>
                </Label.Group>
                <Label color="green" size="medium">
                  TOTAL
                </Label>
                <Label color="green" size="medium">
                  <Icon name="dollar sign" />
                  <Label.Detail>{total}</Label.Detail>
                </Label>
              </Label.Group>
            </Card.Content>
          </Card>
          <Button inverted color="teal" fluid animated="fade">
            <Button.Content visible>CHECKOUT</Button.Content>
            <Button.Content hidden>THANK YOU</Button.Content>
          </Button>
        </Segment>
      </Card.Group>
    );
  } else {
    return (
      <Segment inverted>
        <Message>Add some shoes to your cart</Message>
      </Segment>
    );
  }
};
