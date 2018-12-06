import React from "react";
import { Comment, Container } from "semantic-ui-react";
import moment from "moment";

import { graphql } from "react-apollo";
import { newMessageSubscription, messagesQuery } from "../ApolloService/ApolloRequests";
import styled, { css } from "styled-components";

const PrivateListItem = styled.div`
  width: 100%;
  height: ${props =>
    props.currentlySelected === props.convoId ? "auto" : "87px"};
  overflow-y: hidden;
  padding-bottom: 50px;
  padding-top: 20px;
  ${props => !props.currentlySelected && css``};
`;



class PrivateMessage extends React.Component {
  state = {
    selected: false
  };
  componentDidMount() {
    this.subscribe(this.props.conversationId);
  }
  componentWillUnmount() {
    this.subscribe(this.props.conversationId);
  }
  subscribe = channelId => {
    this.props.data.subscribeToMore({
      document: newMessageSubscription,
      variables: {
        channelId: channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev.getChannelMessages;
        }
        return {
          ...prev,
          getChannelMessages: [
            subscriptionData.data.newMessage,
            ...prev.getChannelMessages
          ]
        };
      }
    });
  };

  render() {
    let {
      data: { getChannelMessages, loading },
      conversationId,
      currentUser
    } = this.props;
    if (loading) {
      return <h2>Loading messages...</h2>;
    } else {
      console.log(getChannelMessages);
      return (
        <div onClick={this.props.handleCellClicked}>
          <PrivateListItem
            currentlySelected={this.props.currentlySelected}
            convoId={this.props.conversationId}
            key={`conversation-#${conversationId}`}
          >
            <Container fluid>
              <Comment.Group size="small">
                {[...getChannelMessages].reverse().map(msg => {
                  let style = {
                    textAlign: msg.author.id === currentUser ? "left" : "right",
                    borderRadius: "30px",
                    backgroundColor:
                      msg.author.id === currentUser
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(0, 0, 0, 0.3)",
                    padding: "10px"
                  };
                  return (
                    <Comment key={msg.id} style={style}>
                      <Comment.Content>
                        <Comment.Author style={{ color: "#fff" }}>
                          {msg.author.email}
                          {"   "}
                          <small>
                            {moment(new Date(msg.created_at)).format("h:mm a")}
                          </small>
                        </Comment.Author>
                        <Comment.Text>{msg.text}</Comment.Text>
                      </Comment.Content>
                    </Comment>
                  );
                })}
              </Comment.Group>
            </Container>
          </PrivateListItem>
        </div>
      );
    }
  }
}



export default graphql(messagesQuery, {
  options: props => ({
    // fetchPolicy: "network-only",
    variables: {
      channelId: props.conversationId
    }
  })
})(PrivateMessage);
