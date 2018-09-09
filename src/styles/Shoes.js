import ShoeBg from "../images/ShoesIndex.jpg";

export default {
  shoesIndex: {
    mainBgLg: {
      height: "90vh",
      width: "85%",
      backgroundImage: `linear-gradient(90deg, rgba(5,25,55,0.5) 0%, rgba(0,77,122,0.5) 25%, rgba(0,135,147,0.5) 50%, rgba(0,191,114,0.5) 75%, rgba(168,235,18,0.5) 100%), url(${ShoeBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      boxShadow: "10px 10px 29px -12px rgba(0,0,0,0.75)",
      margin: "auto",
      transform: "rotateY(-90deg) scale(0.1)",
      opacity: 0
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
      margin: "20px auto",
      width: "85%"
    },
    shoesIndexWrap: {
      position: "absolute",
      top: 0,
      left: 0,
      display: "block",
      height: "100%",
      width: "100vw",
      // zIndex: "-1",
      background:
        "linear-gradient(to bottom, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
    }
  },
  profileMenu: {
    icon: {
      boxShadow: "10px 10px 29px -12px rgba(0,0,0,0.75)"
    }
  },
  shineEffect: {}
};
