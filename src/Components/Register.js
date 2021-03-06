import React from "react";
import { Modal, Form, Button, Message } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { LoginSignupModal } from "../styles/Home/Nav";
import { registerMuration } from '../ApolloService/ApolloRequests'


class Register extends React.Component {
  state = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    let { email, password, firstname, lastname } = this.state;
    let response = await this.props.mutate({
      variables: { email, password, firstname, lastname }
    });
    let { ok, errors } = response.data.registerUser;
    if (ok) {
      this.props.onClose();
      this.props.onRegistrationSuccess();
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
    let { password, email, firstname, lastname, errors } = this.state;
    let errList = [];
    if (errors) {
      Object.values(errors).map(msg => errList.push(msg));
    }
    return (
      <LoginSignupModal open={open} onClose={onClose}>
        <Form onSubmit={this.handleSubmit} error>
          <Modal.Header as="h2">Register For Your Account</Modal.Header>
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
            <Form.Input
              onChange={this.handleChange}
              name="firstname"
              type="text"
              label="Firstname"
              value={firstname}
            />
            <Form.Input
              onChange={this.handleChange}
              name="lastname"
              type="text"
              label="lastname"
              value={lastname}
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
            <Button fluid type="submit">
              Register
            </Button>
          </Modal.Actions>
        </Form>
      </LoginSignupModal>
    );
  }
}

export default graphql(registerMuration)(Register);
