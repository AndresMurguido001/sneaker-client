import React from "react";
import { Image, Icon, Segment, Card, Header, Button } from "semantic-ui-react";
import Reviews from "./Reviews";
import ReactStars from "react-stars";
import AddToCart from "../Containers/AddToCart";
import { withRouter } from "react-router-dom";
import { AuthConsumer } from "../Context/AuthContext";
// create Add To Cart Button

class ShoeDisplay extends React.Component {
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
        <Header
          style={{
            color: "#fff",
            fontSize: "3rem",
            letterSpacing: "0.6rem",
            filter: "drop-shadow(6px 5px 5px rgb(0, 0, 0))"
          }}
          as="h1"
          floated="left"
        >{`${shoe.brand} - ${shoe.model}`}</Header>
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
                    {shoe.owner.profilePic ? (
                      <Image
                        src={shoe.owner.profilePic}
                        centered
                        circular
                        floated="right"
                        size="mini"
                      />
                    ) : (
                      <Icon
                        style={{ float: "right" }}
                        size="big"
                        name="user circle outline"
                      />
                    )}
                  </p>
                  <span style={{ display: "inline" }}>
                    <ReactStars
                      count={5}
                      value={shoe.averageRating}
                      edit={false}
                    />
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
              <AuthConsumer>
                {({ userId }) => (
                  <AddToCart
                    price={shoe.price}
                    shoeId={this.props.match.params.id}
                    userId={userId}
                  />
                )}
              </AuthConsumer>
            </Card>
          </Segment>
        </Card>
        {/* get reviews in review component using shoeId prop*/}
        <Reviews
          reviewModalOpen={reviewModalOpen}
          closeReviewModal={this.closeReviewModal}
          photo={shoe.photos[0]}
          shoeId={shoe.id}
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
    justifyContent: "space-around",
    marginTop: "8rem"
  },
  button: {
    textAlign: "center",
    margin: "auto",
    marginTop: "10px",
    display: "block"
  }
};
export default withRouter(ShoeDisplay);
