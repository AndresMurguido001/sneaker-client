import React from "react";
import { Comment, Container } from "semantic-ui-react";
import moment from "moment";

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const PrivateListItem = styled.div`
  width: 100%;
  height: ${props =>
    props.currentlySelected === props.convoId ? "auto" : "60px"};
  overflow-y: hidden;
  padding-bottom: 50px;
`;

const newMessageSubscription = gql`
  subscription($channelId: Int!) {
    newMessage(channelId: $channelId) {
      id
      text
      author {
        id
        email
      }
      created_at
    }
  }
`;

class PrivateMessage extends React.Component {
  state = {
    selected: false
  };
  componentDidMount() {
    console.log("subscribed");
    this.unsubscribe = this.subscribe(this.props.conversationId);
  }
  componentWillUnmount() {
    console.log("unsubscribed");

    this.unsubscribe();
  }
  subscribe = channelId => {
    console.log("set up subscribe func");
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
      return (
        <div onClick={this.props.handleCellClicked}>
          <PrivateListItem
            currentlySelected={this.props.currentlySelected}
            convoId={this.props.conversationId}
            key={`conversation-#${conversationId}`}
          >
            <Container fluid>
              <Comment.Group size="small">
                {getChannelMessages.map(msg => {
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

const messagesQuery = gql`
  query($channelId: Int!) {
    getChannelMessages(channelId: $channelId) {
      id
      text
      author {
        id
        email
      }
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  options: props => ({
    // fetchPolicy: "network-only",
    variables: {
      channelId: props.conversationId
    }
  })
})(PrivateMessage);
