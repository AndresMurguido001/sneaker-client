import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { graphql, compose } from "react-apollo";
import {
  s3SignMutation,
  createShoeMutation
} from "../ApolloService/ApolloRequests";
import moment from "moment";
import { Button, Form, Header, Message, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import ModalWrap from "../Components/ModalWrap";
//Create Component to resize image
class Upload extends React.Component {
  state = {
    files: [],
    model: "",
    brand: "",
    size: 0,
    price: 0,
    description: "",
    loading: false,
    errors: {},
    visible: false
  };

  onDrop = files => {
    this.setState({ files });
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
      console.log("error uploadToS3", err);
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
        console.log("Error in SendToServer", err);
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

    const createShoeResponse = await this.props.createShoe({
      variables: {
        brand: this.state.brand,
        model: this.state.model,
        description: this.state.description,
        size: parseFloat(this.state.size),
        price: parseFloat(this.state.price),
        photos: resultUrls,
        userId: this.props.userId
      }
    });
    let {
      ok,
      errors,
      shoe: { id }
    } = createShoeResponse.data.createShoe;
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
      this.onClose();
    }
    if (errors) {
      let err = {};
      errors.forEach(({ path, message }) => {
        return (err[`${path.toLowerCase()}Error`] = message);
      });
      this.setState({ errors: err });
    }
    this.setState({ loading: false });
    this.props.history.push(`/shoes/${id}`);
  };
  handleClick = () => this.setState({ visible: !this.state.visible });
  onClose = () => this.setState({ visible: false });
  render() {
    let { errors } = this.state;
    let errList = [];
    if (errors) {
      Object.values(errors).map(msg => errList.push(msg));
    }
    return (
      <ModalWrap
        open={this.state.visible}
        contentDescription="List your shoes"
        iconName="upload"
        handleClick={this.handleClick}
        onClose={this.onClose}
      >
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
            <Form.Input
              label="Size"
              value={this.state.size}
              onChange={this.onChange}
              name="size"
              placeholder="Size"
              maxLength="4"
            />
            <Form.Input
              label="Price"
              value={this.state.price}
              onChange={this.onChange}
              name="price"
              placeholder="Price"
              icon="dollar sign"
              iconPosition="left"
            />
          </Form.Group>

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
              {this.state.files.map((f, i) => (
                <li key={i}>
                  {f.name}
                  {<Image src={f.preview} size="medium" />}
                </li>
              ))}
            </ul>
          </Form.Group>
          <Button type="submit" onClick={this.submit}>
            Submit
          </Button>
          {errors && (
            <Message
              error
              header="There was a problem with your submission"
              list={errList}
            />
          )}
        </Form>
      </ModalWrap>
    );
  }
}

export default compose(
  graphql(s3SignMutation, { name: "s3Sign" }),
  graphql(createShoeMutation, { name: "createShoe" }),
  withRouter
)(Upload);
