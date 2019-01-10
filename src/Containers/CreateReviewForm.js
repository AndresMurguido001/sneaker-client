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
import { graphql, compose } from "react-apollo";
import ReactStars from "react-stars";
import {
  CreateReviewMutation,
  GetShoeReviews
} from "../ApolloService/ApolloRequests";
import { withRouter } from "react-router-dom";

class CreateReviewForm extends React.Component {
  state = {
    message: "",
    starRating: 0
  };

  ratingChanged = newRating => {
    this.setState({
      starRating: newRating
    });
  };
  handleChange = (e, { value }) =>
    this.setState({
      message: value
    });
  handleSubmit = async () => {
    const { shoeId, userId, mutate } = this.props;
    // Create and update review / getReview query;
    await mutate({
      variables: {
        userId,
        shoeId,
        message: this.state.message,
        starRating: this.state.starRating
      },
      update: (proxy, { data: { createReview } }) => {
        const { ok, errors, review } = createReview;
        const data = proxy.readQuery({
          query: GetShoeReviews,
          variables: { shoeId }
        });

        if (ok) {
          this.props.onClose();
          data.getReviews.push(review);
          proxy.writeQuery({
            query: GetShoeReviews,
            variables: { shoeId },
            data
          });
        }
        if (errors) {
          console.log("ERROR: ", errors);
        }
      }
    });
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
                <ReactStars
                  value={this.state.starRating}
                  count={5}
                  onChange={this.ratingChanged}
                  size={24}
                />
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
export default compose(
  withRouter,
  graphql(CreateReviewMutation)
)(CreateReviewForm);
