import React from "react";
import { Container, Icon, Button } from "semantic-ui-react";
import styled, { css } from "styled-components";
import PrivateMessage from "./PrivateMessage";
import { createChannelMutation } from "../ApolloService/ApolloRequests";
import { graphql } from "react-apollo";
import SendMessage from "./SendMessage";
const MessageWrapper = styled.div`
  position: fixed;
  right: 15px;
  bottom: 15px;
  width: 20rem;
  height: 20rem;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.3);
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

const MessagesButton = styled.button`
  background-color: #ccc;
  color: #fff;
  border: 3px solid #ccc;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: fixed;
  bottom: 15px;
  right: 15px;
  box-shadow: 6px 14px 48px 6px rgba(0, 0, 0, 0.45);
  opacity: 1;
  transform: scale(1);
  transition: all 300ms ease-in;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: transform 300ms ease-in;
  }
  &:focus {
    outline: none;
  }
  transition: opacity 300ms ease-out;
  & .mailIcon {
    margin: auto;
  }
  & .bubbleWrapper {
    height: 100%;
    width: 100%;
    margin-top: 10%;
    & .smallCircles {
      fill: #ccc;
      stroke: #ccc;
      stroke-width: 5px;
    }
  }
  & .bubble {
    fill: #ffffff;
  }
  ${props =>
    props.open &&
    css`
      opacity: 0;
      transition: opacity 300ms ease-out;
    `};
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
    console.log(currentConversations);
    return (
      <div>
        <CreateChannelButton />
        <MessageWrapper open={this.props.open}>
          <Container style={{ padding: "10px" }}>
            <Icon
              name="close"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 5,
                fontSize: "20px"
              }}
              onClick={this.props.handleClose}
            />
            {currentConversations.length ? (
              currentConversations.map(convo => (
                <PrivateMessage
                  key={convo.id}
                  handleCellClicked={() => {
                    this.handleSelectedCell(convo.id);
                  }}
                  currentUser={this.props.currentUserId}
                  conversationId={convo.id}
                  currentlySelected={this.state.selectedCell}
                />
              ))
            ) : (
              <div>
                <h1>You dont have any conversations</h1>
              </div>
            )}
          </Container>
        </MessageWrapper>
        <SendMessage
          visible={this.props.open}
          channelId={this.state.selectedCell}
        />
        <MessagesButton
          open={this.props.open}
          onClick={this.props.onMessageClick}
        >
          <svg className="bubbleWrapper" viewBox="0 0 300 300">
            <path
              className="bubble"
              d="M255.5,122.5c-0.3-50.3-53.6-91.1-119.6-91.1S16.2,72.2,16.2,122.5s53.6,91.1,119.6,91.1c1.5,0,3,0,4.5-0.1
        c4.4-0.1,8.7-0.4,13-0.9l0,0c0,0,53.3-12.4,53.9-12.2l31.5,27.2l-1.6-49.3l15.7-36.2l-0.1,0C254.6,135.8,255.5,129.2,255.5,122.5z"
            />
            <circle className="smallCircles" cx="73.5" cy="126.6" r="14.8" />
            <circle className="smallCircles" cx="133.2" cy="126.6" r="14.8" />
            <circle className="smallCircles" cx="193.3" cy="126.6" r="14.8" />
          </svg>
        </MessagesButton>
      </div>
    );
  }
}
export default graphql(createChannelMutation)(MessageContainer);
