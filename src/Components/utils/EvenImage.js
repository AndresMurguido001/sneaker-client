import React from "react";
import { Image } from "semantic-ui-react";

class EvenImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false
    };
    this.imgWrap = React.createRef();
  }
  imageLoaded = () => {
    if (this.imgWrap.current) {
      if (this.imgWrap.current.offsetHeight > 300) {
        this.setState({ large: true });
      }
    }
  };
  render() {
    let { src } = this.props;
    let { large } = this.state;
    return (
      <div onLoad={this.imageLoaded} ref={this.imgWrap}>
        <Image src={src} centered size={large ? "small" : "medium"} />
      </div>
    );
  }
}

export default EvenImage;
