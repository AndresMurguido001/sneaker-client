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

class CreateReviewForm extends React.Component {
  state = {
    message: ""
  };
  handleChange = (e, { value }) =>
    this.setState({
      message: value
    });
  handleSubmit = () => {
    const { shoeId, userId } = this.props;
    console.log(
      "Shoe: ",
      shoeId,
      "User: ",
      userId,
      "message: ",
      this.state.message
    );
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
export default CreateReviewForm;
