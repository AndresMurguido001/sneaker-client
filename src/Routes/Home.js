import React, { Component } from "react";
import bg from "../images/mainOneBg.jpg";

class Home extends Component {
  state = {
    openLoginModal: false,
    openRegisterModal: false
  };
  render() {
    return (
      <div style={style.mainOne}>
        <div className="header" style={style.head}>
          <span style={style.head.lead}>SneakerHeadShop</span>
          <p style={style.head.sub}>The home for all things sneakerhead</p>
        </div>
      </div>
    );
  }
}

let style = {
  mainOne: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gridAutoRows: "150px",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    textAlign: "center"
  },
  head: {
    gridColumn: "1 / 11",
    gridRow: "2 / 6",
    justifySelf: "center",
    alignSelf: "center",
    lead: {
      color: "#fff",
      fontSize: "5em",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: "1em",
      borderRadius: "2em",
      boxShadow: "10px 10px 40px 0px rgba(0,0,0,0.75)"
    },
    sub: {
      color: "#ccc",
      fontSize: "2rem",
      marginTop: "3em"
    }
  }
};
export default Home;
