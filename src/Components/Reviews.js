import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import CreateReviewForm from "../Containers/CreateReviewForm";
//import { Consumer } from "../App";
import ListOfReviews from "../Containers/ListOfReviews";
import { AuthConsumer } from "../Context/AuthContext";
//getReview query
import { GetShoeReviews } from "../ApolloService/ApolloRequests";
import { graphql } from "react-apollo";

// Use getReview query to take advantage of optimistic ui feature to update right after creating review.

const Reviews = ({
  photo,
  reviewModalOpen,
  closeReviewModal,
  shoeId,
  loading,
  data: { getReviews }
}) => {
  return (
    <React.Fragment>
      <AuthConsumer>
        {({ userId }) => (
          <div style={{ height: "100%" }}>
            <CreateReviewForm
              open={reviewModalOpen}
              onClose={closeReviewModal}
              photo={photo}
              shoeId={shoeId}
              userId={userId}
            />
            <Container>
              <Header as="h2" block size="medium">
                <Icon name="chevron down" />
                Reviews
              </Header>
              <ListOfReviews shoeId={shoeId} reviews={getReviews} />
            </Container>
          </div>
        )}
      </AuthConsumer>
    </React.Fragment>
  );
};

export default graphql(GetShoeReviews, {
  options: ({ shoeId }) => ({
    variables: { shoeId }
  })
})(Reviews);
