import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import { Button, Form, Header, Message } from "semantic-ui-react";
import styled from "styled-components";

let PreviewImgWrap = styled.div`
  width: 100px;
`;
let previewImg = preview => (
  <PreviewImgWrap>
    <img src={preview} alt="preview" />
  </PreviewImgWrap>
);

class Upload extends React.Component {
  state = {
    files: [],
    model: "",
    brand: "",
    size: 0,
    description: "",
    loading: false,
    errors: {}
  };

  onDrop = async filesToUpload => {
    this.setState({ files: filesToUpload });
    console.log(this.state.files);
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
      console.log("success");
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
  //Promises here
  sendToServer = async files => {
    let arr = [];
    for (let i = 0; i < files.length; i++) {
      try {
        let res = await this.props.s3Sign({
          variables: {
            filename: this.formatFilename(files[i].name),
            filetype: files[i].type
          }
        });
        arr.push(res);
      } catch (err) {
        console.log("Error", err);
      }
    }

    return arr;
  };

  submit = async () => {
    this.setState({ loading: true });
    const { files } = this.state;
    let resultUrls = [];
    let signedFiles = await this.sendToServer(files);
    signedFiles.map(file => resultUrls.push(file.data.signS3.url));
    let urlAndSignatures = signedFiles.map((file, index) => ({
      file: this.state.files[index],
      signiture: file.data.signS3.signedRequest
    }));
    console.log(urlAndSignatures);

    const createShoeResponse = await this.props.createShoe({
      variables: {
        brand: this.state.brand,
        model: this.state.model,
        description: this.state.description,
        size: parseFloat(this.state.size),
        photos: resultUrls,
        userId: this.props.userId
      }
    });
    let { ok, errors } = createShoeResponse.data.createShoe;
    if (ok) {
      // Push to current shoe listing after uploading to s3
      for (let i = 0; i < urlAndSignatures.length; i++) {
        try {
          await this.uploadToS3(
            urlAndSignatures[i].file,
            urlAndSignatures[i].signiture
          );
        } catch (error) {
          console.log("Error in URL & SIGNS", error);
        }
      }
      this.setState({ loading: false });
      console.log("success");
    }
    if (errors) {
      let err = {};
      console.log(errors);
      errors.forEach(({ path, message }) => {
        return (err[`${path.toLowerCase()}Error`] = message);
      });
      this.setState({ errors: err });
    }
    //history.push("/shoe/:id")
  };

  render() {
    let { errors } = this.state;
    let selectOptions = [
      { text: "5", key: "5", value: "5" },
      { text: "6", key: "6", value: "6" },
      { text: "7", key: "7", value: "7" },
      { text: "8", key: "8", value: "8" },
      { text: "9", key: "9", value: "9" },
      { text: "10", key: "10", value: "10" },
      { text: "11", key: "11", value: "11" }
    ];
    let errList = [];
    if (errors) {
      Object.values(errors).map(msg => errList.push(msg));
    }
    return (
      <Form loading={this.state.loading} style={{ padding: "2rem" }}>
        <Header>List Your Shoes</Header>
        <Form.Group>
          <Form.Input
            label="Brand"
            value={this.state.brand}
            onChange={this.onChange}
            name="brand"
            placeholder="Brand"
            width={6}
          />
          <Form.Input
            label="Model"
            value={this.state.model}
            onChange={this.onChange}
            name="model"
            placeholder="Model"
            width={6}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Description"
            value={this.state.description}
            onChange={this.onChange}
            name="description"
            placeholder="Description"
            width={8}
          />
          <Form.Select
            label="Size"
            value={this.state.size}
            selection
            onChange={this.onChange}
            options={selectOptions}
            name="size"
            placeholder="Size"
          />
        </Form.Group>

        <Form.Field>
          <label>Photos</label>
          <Dropzone onDrop={this.onDrop}>
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </Form.Field>
        <Form.Group>
          Current Uploaded Files
          <ul style={{ listStyle: "none" }}>
            {this.state.files.map((f, i) => (
              <li key={i}>
                {f.name}
                {previewImg(f.preview)}
              </li>
            ))}
          </ul>
        </Form.Group>
        <Button type="submit" onClick={this.submit}>
          Submit
        </Button>
        {errList.length > 0 && (
          <Message
            error
            header="There was a problem with your submission"
            list={errList}
          />
        )}
      </Form>
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
    $size: Float!
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
      errors {
        path
        message
      }
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
