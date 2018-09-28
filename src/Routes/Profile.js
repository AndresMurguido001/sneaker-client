import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import ProfileUser from "../Containers/ProfileUser";
import { Container, Loader, Dimmer } from "semantic-ui-react";
import ProfileMenu from "../Components/ProfileMenu";
import { Redirect } from "react-router-dom";
import MessageContainer from "../Components/MessageContainer";
import { Consumer } from "../App";

let meQuery = gql`
  query($id: String!) {
    getUser(id: $id) {
      id
      email
      firstname
      lastname
      profilePic
      channels {
        id
      }
      shoes {
        brand
        numberOfLikes
        description
        model
        size
        photos
        averageRating
      }
    }
  }
`;

class MyProfile extends React.Component {
  state = {
    open: false
  };
  render() {
    let {
      data: { loading, getUser }
    } = this.props;

    if (loading) {
      return (
        <Dimmer active>
          <Loader size="big">Loading</Loader>
        </Dimmer>
      );
    }
    if (getUser) {
      return (
        <ProfileMenu isInverted>
          <Container>
            <h1>{`Welcome To Your Profile ${getUser.firstname}`}</h1>
            <Consumer>
              {value => (
                <MessageContainer
                  receiverId={getUser.id}
                  currentUserId={value}
                  open={this.state.open}
                  onMessageClick={() =>
                    this.setState({ open: !this.state.open })
                  }
                  currentConversations={getUser.channels}
                />
              )}
            </Consumer>
            <ProfileUser data={getUser} />
          </Container>
        </ProfileMenu>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default graphql(meQuery, {
  options: ({
    match: {
      params: { id }
    }
  }) => ({
    variables: { id: id },
    fetchPolicy: "cache-and-network"
  })
})(MyProfile);
