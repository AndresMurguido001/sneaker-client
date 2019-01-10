import React from "react";
import { Card, Image, Icon, Container, Header } from "semantic-ui-react";

class ListOfReviews extends React.Component {
  render() {
    const { reviews } = this.props;
    if (!reviews) {
      return (
        <Container fluid>
          <Header
            as="h2"
            block
            content="There hasnt been any reviews for this pair"
          />
        </Container>
      );
    }
    return (
      <Container fluid>
        <Card.Group>
          {reviews.map((review, index) => (
            <Card raised fluid key={`${review.id}-${review.user.id}`}>
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
                <Card.Description style={{ paddingLeft: "20px" }}>
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
