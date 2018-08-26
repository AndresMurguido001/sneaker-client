import React from "react";
import { Card, Icon, Image, Grid } from "semantic-ui-react";
import avatar from "../images/avatar.ico";
import bg from "../images/ProfileBg.jpg";
import UsersShoes from "../Components/UsersShoes";
import ModalWrap from "../Components/ModalWrap";
import UploadShoe from "../Containers/UploadShoe";
import UploadProfilePic from "../Containers/UploadProfilePic";

let ProfileUser = ({
  data: { id, firstname, lastname, email, shoes, profilePic }
}) => {
  return (
    <div>
      <Grid columns={3} padded="horizontally">
        <Grid.Column>
          <Card>
            <Image src={bg} />
            <Card.Content>
              <Card.Header>Most Recent</Card.Header>
              <Card.Meta>Joined in 2016</Card.Meta>
              <Card.Description>Shoe Description</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                Number of likes
              </a>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card>
            <Image size="medium" src={profilePic ? profilePic : avatar} />
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
              <Icon name="user" />
              Total number of likes
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
      <ModalWrap contentDescription="Upload your photo" iconName="picture">
        <UploadProfilePic />
      </ModalWrap>
      <ModalWrap contentDescription="List your shoes" iconName="upload">
        <UploadShoe userId={id} />
      </ModalWrap>
      <UsersShoes shoes={shoes} />
    </div>
  );
};
export default ProfileUser;
