import React from "react";
import { Comment } from "semantic-ui-react";
import SendMessage from "./SendMessage";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      created_at
      author {
        email
      }
    }
  }
`;

const messagesQuery = gql`
  query($channelId: Int!) {
    getChannelMessages(channelId: $channelId) {
      id
      text
      author {
        email
      }
      created_at
    }
  }
`;

class PrivateMessage extends React.Component {
  subscribe = channelId => {
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId: channelId
      }
    });
  };

  render() {
    let {
      data: { getChannelMessages, loading },
      conversationId
    } = this.props;
    if (loading) {
      return <h2>Loading messages...</h2>;
    } else {
      this.subscribe(conversationId);
      return (
        <div style={{ border: "1px solid black" }}>
          {getChannelMessages.map(msg => (
            <Comment key={msg.id}>
              <Comment.Content>
                <Comment.Text>{msg.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          <SendMessage channelId={this.props.conversationId} />
        </div>
      );
    }
  }
}
export default graphql(messagesQuery, {
  options: props => ({
    variables: {
      channelId: props.conversationId
    }
  })
})(PrivateMessage);
