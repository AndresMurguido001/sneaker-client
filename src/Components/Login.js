import React from "react";
import { Modal, Form, Button, Message } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    let { email, password } = this.state;
    let response = await this.props.mutate({ variables: { email, password } });
    let { ok, errors, token, refreshToken } = response.data.login;
    if (ok) {
      this.props.onClose();

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.props.history.push("/profile");
    } else {
      let err = {};
      errors.forEach(({ path, message }) => {
        return (err[`${path.toLowerCase()}Error`] = message);
      });
      this.setState({ errors: err });
    }
  };
  render() {
    let { open, onClose } = this.props;
    let { password, email, errors } = this.state;
    let errList = [];
    if (errors) {
      Object.values(errors).map(msg => errList.push(msg));
    }

    return (
      <Modal open={open} onClose={onClose} style={{ padding: "20px" }}>
        <Form onSubmit={this.handleSubmit} error>
          <Modal.Header as="h2">Login</Modal.Header>
          <Modal.Content>
            <Form.Input
              onChange={this.handleChange}
              name="email"
              type="email"
              label="Email"
              value={email}
            />
            <Form.Input
              onChange={this.handleChange}
              name="password"
              type="password"
              label="Password"
              value={password}
            />
            {errList.length > 0 && (
              <Message
                error
                header="There was a problem with your submission"
                list={errList}
              />
            )}
          </Modal.Content>

          <Modal.Actions>
            <Button style={{ marginTop: "10px" }} primary type="submit">
              Login
            </Button>
          </Modal.Actions>
        </Form>
      </Modal>
    );
  }
}

export default compose(
  graphql(loginMutation),
  withRouter
)(Login);
