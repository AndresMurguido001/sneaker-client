import React from "react";
import animation from "../animation";

class CardAnimateWrap extends React.Component {
  wrap = React.createRef();

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    if (window.scrollY >= 350) {
      animation.shoesAppear(this.wrap.current);
      window.removeEventListener("scroll", this.handleScroll);
    }
  };

  render() {
    let { children } = this.props;
    return (
      <div style={styles.wrapper} className="cardWrap" ref={this.wrap}>
        {children}
      </div>
    );
  }
}
let styles = {
  wrapper: {
    transform: "translateY(200px) rotateY(-90deg)",
    perspective: "800",
    opacity: "0"
  }
};

export default CardAnimateWrap;
