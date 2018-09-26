import React from "react";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import styled from "styled-components";
import PrivateMessage from "./PrivateMessage";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const MessageWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 20rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  z-index: 2;
`;

const createChannelMutation = gql`
  mutation($senderId: Int!, $receiverId: Int!) {
    createChannel(senderId: $senderId, receiverId: $receiverId) {
      ok
    }
  }
`;

class MessageContainer extends React.Component {
  handleClick = async () =>
    await this.props.mutate({
      variables: {
        senderId: this.props.currentUserId,
        receiverId: this.props.receiverId
      }
    });

  render() {
    let { currentConversations, receiverId, currentUserId } = this.props;
    let CreateChannelButton = () => {
      if (receiverId !== currentUserId) {
        return (
          <Button
            onClick={this.handleClick}
            floated="right"
            animated="vertical"
          >
            <Button.Content hidden>Message</Button.Content>
            <Button.Content visible>
              <Icon name="mail" />
            </Button.Content>
          </Button>
        );
      } else {
        return null;
      }
    };
    return (
      <div>
        <CreateChannelButton />
        <MessageWrapper>
          <Container fluid style={{ padding: "10px" }}>
            <Header as="h3" dividing>
              Your current conversations
            </Header>
            <ul>
              {currentConversations.map(convo => (
                <li key={`conversation-#${convo.id}`}>
                  <PrivateMessage conversationId={convo.id} />
                </li>
              ))}
            </ul>
          </Container>
        </MessageWrapper>
      </div>
    );
  }
}
export default graphql(createChannelMutation)(MessageContainer);
