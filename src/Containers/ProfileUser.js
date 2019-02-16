import React from "react";
import noUserPic from "../images/user.png";
import { Card, Icon, Image, Grid, Container, Feed } from "semantic-ui-react";
import bg from "../images/ProfileBg.jpg";
import UsersShoes from "../Components/UsersShoes";
import UploadShoe from "../Containers/UploadShoe";
import UploadProfilePic from "../Containers/UploadProfilePic";

class ProfileUser extends React.Component {
  render() {
    let {
      data: { id, firstname, lastname, email, shoes, profilePic }
    } = this.props;

    let hasShoes = shoes.length > 0 ? true : false;

    let mostRecent = shoes[shoes.length - 1];
    let mostRecentPhoto =
      hasShoes && mostRecent.photos ? mostRecent.photos[0] : "";
    let likesArr = hasShoes ? shoes.map(shoe => shoe.numberOfLikes) : null;
    let totalLikes = hasShoes ? likesArr.reduce((acc, cv) => acc + cv) : 0;

    return (
      <div>
        <Container>
          <Grid
            style={{ paddingTop: "5rem" }}
            columns={3}
            padded="horizontally"
          >
            <Grid.Column>
              {hasShoes ? (
                <Card>
                  <Image
                    size="medium"
                    src={mostRecentPhoto ? mostRecentPhoto : bg}
                  />
                  {/* Change to Content Block Semantic to display users who've liked shoes */}
                  <Card.Content>
                    <Card.Header>{mostRecent.model}</Card.Header>
                    <Card.Meta>{mostRecent.brand}</Card.Meta>
                    <Card.Description>
                      {mostRecent.description}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                      <Icon name="like" />
                      {mostRecent.numberOfLikes}
                    </a>

                    <span style={{ float: "right" }}>{`Size: ${
                      mostRecent.size
                    }`}</span>
                  </Card.Content>
                </Card>
              ) : (
                <Card>
                  <Card.Header textAlign="center" style={{ padding: "20px 0" }}>
                    Your lastest uploaded pair will appear here
                  </Card.Header>
                  <Card.Content
                    textAlign="center"
                    style={{ padding: "20px 0" }}
                  >
                    Upload Images to show the condition of your shoes
                  </Card.Content>
                  <Card.Meta style={{ padding: "20px 0" }} textAlign="center">
                    Here is where the likes will be displayed as well as the
                    price, and your avatar image for your customers to reach
                    your profile.
                  </Card.Meta>
                </Card>
              )}
            </Grid.Column>
            <Grid.Column>
              <Card>
                {profilePic ? (
                  <Image src={profilePic} />
                ) : (
                  <Image src={noUserPic} />
                )}
                <Card.Content>
                  <Card.Header>{`${firstname} ${lastname}`}</Card.Header>
                  <Card.Meta>
                    <span className="email">{email}</span>
                  </Card.Meta>
                  <Card.Description>
                    Pairs of shoes: {shoes.length}{" "}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="user" />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card>
                <Card.Content header={`About ${firstname}`} />
                <Card.Content description="Description goes here" />
                <Card.Content extra>
                  <Icon inverted circular name="like" />
                  Total: {totalLikes}
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Recent Activity</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label icon="user" />
                      <Feed.Content>
                        <Feed.Date content="1 day ago" />
                        <Feed.Summary>
                          You added <a>Jenny Hess</a> to your <a>coworker</a>{" "}
                          group.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label icon="user" />
                      <Feed.Content>
                        <Feed.Date content="3 days ago" />
                        <Feed.Summary>
                          You added <a>Molly Malone</a> as a friend.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label icon="user" />
                      <Feed.Content>
                        <Feed.Date content="4 days ago" />
                        <Feed.Summary>
                          You added <a>Elliot Baker</a> to your <a>musicians</a>{" "}
                          group.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
          <div>
            <UploadProfilePic />
            <UploadShoe userId={id} />
          </div>
        </Container>
        <UsersShoes userId={id} profilePic={profilePic} shoes={shoes} />
      </div>
    );
  }
}

export default ProfileUser;
