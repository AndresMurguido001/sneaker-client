import React from "react";
import { DeleteShoeMutation, meQuery } from "../ApolloService/ApolloRequests";
import { graphql } from "react-apollo";
import { Icon } from "semantic-ui-react";

class DeleteShoeWrapper extends React.Component {
  deleteShoe = async (shoeId, id) => {
    await this.props.mutate({
      variables: shoeId,
      update: (proxy, { data: { deleteShoe } }) => {
        let { ok } = deleteShoe;
        if (ok) {
          const data = proxy.readQuery({
            query: meQuery,
            variables: { id: id.toString() }
          });
          if (data.getUser) {
            data.getUser.shoes.forEach((x, idx) => {
              if (x.id === shoeId) {
                data.getUser.shoes.splice(idx, 1);
              }
            });
          }
        }
      }
    });
  };
  render() {
    const { shoeId, userId } = this.props;
    return (
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
          onClick={() => this.deleteShoe(shoeId, userId)}
        />
      </React.Fragment>
    );
  }
}

export default graphql(DeleteShoeMutation)(DeleteShoeWrapper);
