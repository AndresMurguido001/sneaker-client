import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import { Button, Form, Header } from "semantic-ui-react";
import styled from "styled-components";
import ModalWrap from "../Components/ModalWrap";

let PreviewImgWrap = styled.div`
  width: 100px;
`;
let previewImg = preview => (
  <PreviewImgWrap>
    <img
      style={{ height: "200px", width: "200px" }}
      src={preview}
      alt="preview"
    />
  </PreviewImgWrap>
);

class UploadProfilePic extends React.Component {
  state = {
    file: null,
    loading: false,
    visible: false
  };

  onDrop = async file => {
    this.setState({ file: file[0] });
  };

  onChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  };
  //Create Promises here
  uploadToS3 = async (file, signature) => {
    try {
      const options = {
        headers: {
          "Content-Type": file.type
        }
      };
      await axios.put(signature, file, options);
    } catch (err) {
      console.log("Error", err);
    }
  };

  formatFilename = filename => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };
  //Resize Image

  submit = async () => {
    this.setState({ loading: true });
    const { file } = this.state;
    const response = await this.props.s3Sign({
      variables: {
        filename: this.formatFilename(file.name),
        filetype: file.type
      }
    });
    const { signedRequest, url } = response.data.signS3;
    await this.uploadToS3(file, signedRequest);

    const graphqlResponse = await this.props.uploadPic({
      variables: {
        profilePic: url
      }
    });
    let { ok, errors } = graphqlResponse.data.uploadProfilePic;
    if (ok) {
      console.log("Successfully uploaded profile pic");
      //Close Modal
    } else {
      //Display Error Messages
      console.log("Error: ", errors);
    }
    this.setState({ loading: false });
    this.onClose();
  };
  handleClick = () => this.setState({ visible: !this.state.visible });
  onClose = () => this.setState({ visible: false });

  render() {
    const { file, visible } = this.state;
    return (
      <ModalWrap
        handleClick={this.handleClick}
        onClose={this.onClose}
        open={visible}
        contentDescription="Upload your photo"
        iconName="picture"
      >
        <Form loading={this.state.loading} style={{ padding: "2rem" }}>
          <Header>Upload your profile picutre</Header>
          <Form.Field>
            <label>Photos</label>
            <Dropzone onDrop={this.onDrop}>
              <p>
                Try dropping some files here, or click to select files to
                upload.
              </p>
            </Dropzone>
          </Form.Field>
          <Form.Group>
            Current Uploaded Files
            <ul style={{ listStyle: "none" }}>
              {
                <li>
                  {file ? file.name : null}
                  {file ? previewImg(file.preview) : null}
                </li>
              }
            </ul>
          </Form.Group>
          <Button type="submit" onClick={this.submit}>
            Submit
          </Button>
        </Form>
      </ModalWrap>
    );
  }
}

const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;
const uploadProfilePicMutation = gql`
  mutation($profilePic: String!) {
    uploadProfilePic(profilePic: $profilePic) {
      ok
      errors {
        path
        message
      }
      profilePic
    }
  }
`;

export default compose(
  graphql(s3SignMutation, { name: "s3Sign" }),
  graphql(uploadProfilePicMutation, { name: "uploadPic" })
)(UploadProfilePic);
