import React from "react";
import { Form } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { createMessageMutation } from "../ApolloService/ApolloRequests";
import styled, { css } from "styled-components";

const InputElement = styled.div`
  position: absolute;
  bottom: 10px;
  width: 18rem;
  right: 15px;
  z-index: 4;
  opacity: 0;
  transition: opacity 200ms ease-in;
  ${props =>
    props.visible &&
    props.channelId &&
    css`
      opacity: 1;
      transition: opacity 200ms ease-in;
      transition-delay: 300ms;
    `};
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
    this.setState({
      message: ""
    });
  };

  render() {
    return (
      <InputElement
        visible={this.props.visible}
        channelId={this.props.channelId}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
        </Form>
      </InputElement>
    );
  }
}
export default graphql(createMessageMutation)(SendMessage);
