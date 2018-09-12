import React from "react";
import {
  Modal,
  Image,
  Header,
  Form,
  Button,
  Icon,
  Container
} from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const CreateReviewMutation = gql`
  mutation($message: String!, $userId: Int!, $shoeId: Int!) {
    createReview(message: $message, userId: $userId, shoeId: $shoeId) {
      ok
      errors {
        path
        message
      }
      review {
        message
      }
    }
  }
`;

class CreateReviewForm extends React.Component {
  state = {
    message: ""
  };
  handleChange = (e, { value }) =>
    this.setState({
      message: value
    });
  handleSubmit = async () => {
    const { shoeId, userId, mutate } = this.props;
    let reviewResponse = await mutate({
      variables: {
        userId,
        shoeId,
        message: this.state.message
      }
    });
    console.log(reviewResponse);
    let { ok, review } = reviewResponse.data.createReview;
    if (ok) {
      console.log("Review created successfully");
    }
    console.log(review);
  };
  render() {
    const { photo, open, onClose } = this.props;
    return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>Write a Review</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={photo} />
          <Modal.Description>
            <Container>
              <Form onSubmit={this.handleSubmit}>
                <Header>Shoes brand/title</Header>
                <Form.TextArea
                  onChange={this.handleChange}
                  label="Review"
                  placeholder="What did you think about these shoes?"
                />
                <Button floated="right" animated>
                  <Button.Content visible>Submit Your Review</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Form>
            </Container>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
export default graphql(CreateReviewMutation)(CreateReviewForm);
