import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import CreateReviewForm from "../Containers/CreateReviewForm";
import { Consumer } from "../App";
import ListOfReviews from "../Containers/ListOfReviews";

const Reviews = ({
  photo,
  reviewModalOpen,
  closeReviewModal,
  shoeId,
  reviews
}) => (
  <div style={{ height: "100vh" }}>
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
      <ListOfReviews shoeId={shoeId} reviews={reviews} />
    </Container>
  </div>
);

export default Reviews;
