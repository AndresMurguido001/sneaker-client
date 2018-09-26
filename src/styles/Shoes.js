import ShoeBg from "../images/ShoesIndex.jpg";

export default {
  shoesIndex: {
    mainBgLg: {
      height: "70vh",
      width: "100%",
      background: `linear-gradient(90deg, rgba(5,25,55,0.5) 0%, rgba(0,77,122,0.5) 25%, rgba(0,135,147,0.5) 50%, rgba(0,191,114,0.5) 75%, rgba(168,235,18,0.5) 100%), url(${ShoeBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      boxShadow: "10px 10px 29px -12px rgba(0,0,0,0.75)",
      margin: "auto"
    },
    headerWrap: {
      display: "flex",
      flexDirection: "column",
      width: "400px",
      paddingTop: "6rem",
      paddingLeft: "2rem"
    },
    primaryHeader: {
      textShadow: "2px 2px 11px rgba(0, 0, 0, 0.5)",
      fontSize: "3rem"
    },
    secondaryHeader: {
      textShadow: "2px 2px 11px rgba(0, 0, 0, 0.5)",
      fontSize: "1.5rem"
    },
    grid: {
      display: "flex",
      margin: "auto",
      width: "85%"
    },
    shoesIndexWrap: {
      position: "absolute",
      top: 0,
      left: 0,
      display: "block",
      height: "100%",
      width: "100vw",
      zIndex: "-1",
      background:
        "linear-gradient(to bottom, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
    }
  },
  profileMenu: {
    icon: {
      boxShadow: "10px 10px 29px -12px rgba(0,0,0,0.75)"
    }
  },
  searchBar: {
    width: "20rem",
    float: "right",
    boxShadow: "10px 10px 29px -12px rgba(0,0,0,0.75)",
    margin: "20px 10px 0 0"
  },
  searchIcon: {
    color: "#fff",
    float: "right",
    margin: "10px 10px 0 0"
  }
};
