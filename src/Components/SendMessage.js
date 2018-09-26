import React from "react";
import { Form } from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

class SendMessage extends React.Component {
  state = {
    message: ""
  };
  handleSubmit = async () => {
    let { message } = this.state;
    await this.props.mutate({
      variables: { channelId: this.props.channelId, text: message }
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          onChange={e => this.setState({ message: e.target.value })}
        />
      </Form>
    );
  }
}
export default graphql(createMessageMutation)(SendMessage);
