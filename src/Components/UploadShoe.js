import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import { Button, Form } from "semantic-ui-react";

class Upload extends React.Component {
  state = {
    file: null,
    model: "",
    brand: "",
    size: 0,
    description: ""
  };

  onDrop = async files => {
    this.setState({ file: files[0] });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options);
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

  submit = async () => {
    const { file } = this.state;
    const response = await this.props.s3Sign({
      variables: {
        filename: this.formatFilename(file.name),
        filetype: file.type
      }
    });

    const { signedRequest, url } = response.data.signS3;
    await this.uploadToS3(file, signedRequest);

    const createShoeResponse = await this.props.createShoe({
      variables: {
        brand: this.state.brand,
        model: this.state.model,
        description: this.state.description,
        size: parseFloat(this.state.size),
        photos: [url],
        userId: this.props.userId
      }
    });
    let { ok } = createShoeResponse.data.createShoe;
    if (ok) {
      // Push to current shoe listing
      console.log("Success");
    }
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Brand</label>
            <input
              value={this.state.brand}
              onChange={this.onChange}
              name="brand"
              placeholder="Brand"
            />
          </Form.Field>
          <Form.Field>
            <label>Model</label>
            <input
              value={this.state.model}
              onChange={this.onChange}
              name="model"
              placeholder="Model"
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              value={this.state.description}
              onChange={this.onChange}
              name="description"
              placeholder="Description"
            />
          </Form.Field>
          <Form.Field>
            <label>Size</label>
            <input
              value={this.state.size}
              onChange={this.onChange}
              name="size"
              placeholder="Size"
            />
          </Form.Field>
          <Form.Field>
            <label>Photos</label>
            <Dropzone onDrop={this.onDrop}>
              <p>
                Try dropping some files here, or click to select files to
                upload.
              </p>
            </Dropzone>
          </Form.Field>
          <Button type="submit" onClick={this.submit}>
            Submit
          </Button>
        </Form>
      </div>
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
const createShoeMutation = gql`
  mutation(
    $brand: String!
    $model: String!
    $size: Int!
    $userId: Int!
    $description: String!
    $photos: [String!]
  ) {
    createShoe(
      brand: $brand
      model: $model
      size: $size
      userId: $userId
      description: $description
      photos: $photos
    ) {
      ok
      shoe {
        brand
        owner {
          firstname
        }
        model
        photos
      }
    }
  }
`;

export default compose(
  graphql(s3SignMutation, { name: "s3Sign" }),
  graphql(createShoeMutation, { name: "createShoe" })
)(Upload);
