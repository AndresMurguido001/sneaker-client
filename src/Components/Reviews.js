import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import CreateReviewForm from "../Containers/CreateReviewForm";
//import { Consumer } from "../App";
import ListOfReviews from "../Containers/ListOfReviews";
import { AuthConsumer } from "../Context/AuthContext";
//getReview query
import { GetShoeReviews } from "../ApolloService/ApolloRequests";
import { graphql } from "react-apollo";
import { HeadingSecondary } from "../styles/Home/Home";

const Reviews = ({
  photo,
  reviewModalOpen,
  closeReviewModal,
  shoeId,
  data: { loading, getReviews }
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
		{/*
			<HeadingSecondary underlined>Reviews</HeadingSecondary>
		*/}
            <Container style={{ margin: "5rem 0" }}>
              <ListOfReviews shoeId={shoeId} loading={loading} reviews={getReviews} />
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
