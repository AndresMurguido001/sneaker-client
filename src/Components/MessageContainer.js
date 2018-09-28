import React from "react";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import styled, { css } from "styled-components";
import PrivateMessage from "./PrivateMessage";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import SendMessage from "./SendMessage";

const MessageWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 20rem;
  min-height: 300px;
  max-height: 400px;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  z-index: 2;
  opacity: 0;
  transform-origin: bottom right;
  transform: scale(0);
  opacity: 0;
  transition: all 300ms ease-in;
  ${props =>
    props.open &&
    css`
      transform: scale(1);
      opacity: 1;
      transition: all 300ms ease-in;
    `};
`;

const createChannelMutation = gql`
  mutation($senderId: Int!, $receiverId: Int!) {
    createChannel(senderId: $senderId, receiverId: $receiverId) {
      ok
    }
  }
`;

class MessageContainer extends React.Component {
  state = {
    selectedCell: 0,
    visible: false
  };
  handleClick = async () =>
    await this.props.mutate({
      variables: {
        senderId: this.props.currentUserId,
        receiverId: this.props.receiverId
      }
    });

  handleSelectedCell = convoId => {
    this.setState({ selectedCell: convoId, visible: true });
  };

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
        <MessageWrapper open={this.props.open}>
          <Container style={{ padding: "10px" }}>
            <Header as="h3" dividing>
              Your current conversations
            </Header>
            {currentConversations.map(convo => (
              <PrivateMessage
                key={convo.id}
                handleCellClicked={() => {
                  this.handleSelectedCell(convo.id);
                }}
                currentUser={this.props.currentUserId}
                conversationId={convo.id}
                currentlySelected={this.state.selectedCell}
              />
            ))}
          </Container>
        </MessageWrapper>
        <SendMessage
          visible={this.props.open}
          channelId={this.state.selectedCell}
        />
        <Button
          circular
          onClick={this.props.onMessageClick}
          size="massive"
          floated="right"
          icon="mail"
        />
      </div>
    );
  }
}
export default graphql(createChannelMutation)(MessageContainer);
