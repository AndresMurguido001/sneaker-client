import React from "react";
import { Image, Icon, Segment, Card, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default ({ shoe }) => {
  return (
    <div style={style.container}>
      <Header as="h2" floated="left">{`${shoe.brand} - ${shoe.model}`}</Header>

      <Card style={{ alignSelf: "flex-start" }} fluid>
        <Segment>
          <Image rounded size="big" src={shoe.photos[0]} floated="left" />
          <Segment.Group style={style.description}>
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
            <Card raised>
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
              <Card.Content textAlign="center">
                <p style={{ margin: "auto 0" }}>
                  {shoe.owner.firstname} {shoe.owner.lastname}
                </p>
                <Link to={`/${shoe.owner.id}`}>
                  <Image
                    src={shoe.owner.profilePic}
                    centered
                    circular
                    size="tiny"
                  />
                </Link>
              </Card.Content>
            </Card>
          </Segment.Group>
        </Segment>
      </Card>
    </div>
  );
};
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
  }
};
