import React from "react";
import styled, { css } from "styled-components";
import { Icon, Segment, Dimmer, Loader } from "semantic-ui-react";
import { GetCartQuery } from "../ApolloService/ApolloRequests";
import { graphql } from "react-apollo";
import Cart from "../Components/Cart";

const CartWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  height: 100%;
  z-index: 100;
  width: 25%;
  transform: translateX(100%);
  ${p =>
    p.cartOpen &&
    css`
      transform: translateX(0);
    `}
  transition: all 0.5s;
  // -webkit-box-shadow: -9px 10px 63px 0px rgba(0, 0, 0, 0.75);
  // -moz-box-shadow: -9px 10px 63px 0px rgba(0, 0, 0, 0.75);
  box-shadow: -9px 10px 63px 0px rgba(0, 0, 0, 0.75);
`;

class CartContainer extends React.Component {
  componentDidMount() {
    console.log(this.props.data);
  }
  render() {
    const {
      cartOpen,
      onCloseClick,
      data: { loading, getCart }
    } = this.props;
    if (loading) {
      return (
        <div>
          <Segment>
            <Dimmer active>
              <Loader content="Loading" />
            </Dimmer>
          </Segment>
        </div>
      );
    }
    return (
      <div
        onLoad={() => this.props.onQuantityChange(getCart.quantity)}
        style={{
          width: cartOpen ? "100%" : "0",
          height: "100%",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "50"
        }}
        onClick={onCloseClick}
      >
        <CartWrapper cartOpen={cartOpen}>
          <Cart data={getCart ? getCart : []} />
        </CartWrapper>
      </div>
    );
  }
}
export default graphql(GetCartQuery, {
  options: ({ userId }) => ({
    variables: { userId }
  })
})(CartContainer);
