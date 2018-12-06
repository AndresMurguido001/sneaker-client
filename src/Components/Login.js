import React from "react";
import { Modal, Form, Button, Message } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { LoginSignupModal } from "../styles/Home/Nav";
import { loginMutation } from '../ApolloService/ApolloRequests'


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
      let {
        user: { id }
      } = jwt_decode(token);
      this.props.history.push(`/profile/${id}`);
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
      <LoginSignupModal open={open} onClose={onClose}>
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
            <Button primary fluid type="submit">
              Login
            </Button>
          </Modal.Actions>
        </Form>
      </LoginSignupModal>
    );
  }
}

export default compose(
  graphql(loginMutation),
  withRouter
)(Login);
