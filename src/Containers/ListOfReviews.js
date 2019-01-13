import React from "react";
import { HeadingSecondary } from "../styles/Home/Home.js"
import { Card, Image, Icon, Container, Header } from "semantic-ui-react";

class ListOfReviews extends React.Component {
  render() {
    const { reviews, loading } = this.props;
    if (!loading && !reviews.length) {
      return (
        <Container fluid>
	    <HeadingSecondary underlined>No Reviews</HeadingSecondary>
        </Container>
      );
    }
    return (
      <Container fluid>
	    <HeadingSecondary underlined>Reviews</HeadingSecondary>
        <Card.Group>
          {!loading && reviews.map((review, index) => (
            <Card
              style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              raised
              fluid
              key={`${review.id}-${review.user.id}`}
            >
              <Card.Content>
                <Card.Header textAlign="left">
                  {review.user.profilePic ? (
                    <Image size="big" avatar src={review.user.profilePic} />
                  ) : (
                    <Icon size="big" name="user circle" />
                  )}
                  {review.user.email}
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Card.Description
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "400",
                    paddingLeft: "20px"
                  }}
                >
                  <Icon name="chevron circle right" size="small" />
                  {review.message}
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    );
  }
}
export default ListOfReviews;
