import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import CreateReviewForm from "../Containers/CreateReviewForm";
import { Consumer } from "../App";

const ReviewFormWithUser = () => {};

const Reviews = ({ photo, reviewModalOpen, closeReviewModal, shoeId }) => (
  <div>
    <Consumer>
      {value => (
        <CreateReviewForm
          open={reviewModalOpen}
          onClose={closeReviewModal}
          photo={photo}
          shoeId={shoeId}
          userId={value}
        />
      )}
    </Consumer>
    <Container>
      <Header as="h2" block size="medium">
        <Icon name="chevron down" />
        Reviews
      </Header>
    </Container>
  </div>
);

export default Reviews;
