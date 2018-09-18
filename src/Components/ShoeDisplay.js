import React from "react";
import { Image, Icon, Segment, Card, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Reviews from "./Reviews";
import ReactStars from "react-stars";

export default class ShoeDisplay extends React.Component {
  state = {
    reviewModalOpen: false
  };
  handleReviewBtnClick = () =>
    this.setState({ reviewModalOpen: !this.state.reviewModalOpen });

  closeReviewModal = () => this.setState({ reviewModalOpen: false });
  render() {
    let { shoe } = this.props;

    const { reviewModalOpen } = this.state;
    return (
      <div style={style.container}>
        <Header as="h1" floated="left">{`${shoe.brand} - ${
          shoe.model
        }`}</Header>
        <Card raised style={{ alignSelf: "flex-start" }} fluid>
          <Segment>
            <Image rounded size="big" src={shoe.photos[0]} floated="left" />
            <Image.Group size="small" style={style.smallImgs}>
              {shoe.photos.map((img, index) => (
                <Image
                  bordered
                  key={`shoe-image-${index}`}
                  src={img}
                  floated="left"
                />
              ))}
            </Image.Group>
            <Card style={{ float: "right" }} raised>
              <Card.Header as="h2" style={{ paddingLeft: "10px" }}>
                Description
              </Card.Header>
              <Card.Content>{shoe.description}</Card.Content>
              <Card.Content extra>
                <Icon name="like" /> {`${shoe.numberOfLikes}`}
                <span style={{ float: "right" }}>Size: {shoe.size}</span>
              </Card.Content>
            </Card>
            <Card style={{ float: "right" }}>
              <Card.Header as="h2" style={{ paddingLeft: "10px" }}>
                Owner
              </Card.Header>
              <Card.Content textAlign="left">
                <Segment>
                  <p style={{ margin: "auto 0" }}>
                    {shoe.owner.firstname} {shoe.owner.lastname}
                    <Link to={`/${shoe.owner.id}`}>
                      {shoe.owner.profilePic ? (
                        <Image
                          src={shoe.owner.profilePic}
                          centered
                          circular
                          size="small"
                        />
                      ) : (
                        <Icon
                          style={{ float: "right" }}
                          size="big"
                          name="user circle outline"
                        />
                      )}
                    </Link>
                  </p>
                  <span style={{ display: "inline" }}>
                    <ReactStars
                      count={5}
                      value={shoe.averageRating}
                      edit={false}
                    />
                    {`(${shoe.reviews.length})`}
                  </span>
                </Segment>
                <Button
                  onClick={this.handleReviewBtnClick}
                  style={style.button}
                  animated
                >
                  <Button.Content visible>Have these Shoes?</Button.Content>
                  <Button.Content hidden>
                    <Icon name="star" />
                    Leave a Review
                  </Button.Content>
                </Button>
              </Card.Content>
            </Card>
          </Segment>
        </Card>
        <Reviews
          reviewModalOpen={reviewModalOpen}
          closeReviewModal={this.closeReviewModal}
          photo={shoe.photos[0]}
          shoeId={shoe.id}
          reviews={shoe.reviews}
        />
      </div>
    );
  }
}
let style = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  smallImgs: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    float: "left",
    paddingRight: "10px"
  },
  description: {
    alignSelf: "flex-start",
    float: "right",
    padding: "10px"
  },
  button: {
    textAlign: "center",
    margin: "auto",
    marginTop: "10px",
    display: "block"
  }
};
