import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { AddToCartMutation } from "../ApolloService/ApolloRequests";

const AddToCart = ({ mutate, shoeId, userId, price }) => {
  let handleClick = async () => {
    let data = await mutate({
      variables: { userId, shoeId: parseInt(shoeId, 10) }
    });
    console.log(data);
  };

  return (
    <Button animated="vertical" positive onClick={() => handleClick()}>
      <Button.Content hidden>
        <Icon name="add to cart" />
        Add To Cart
      </Button.Content>
      <Button.Content visible>
        <Icon name="dollar sign" />
        {price}
      </Button.Content>
    </Button>
  );
};
export default graphql(AddToCartMutation)(AddToCart);
