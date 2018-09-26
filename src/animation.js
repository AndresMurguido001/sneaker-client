import { TweenMax } from "gsap";

export default {
  profileMenuOpen: target => {
    TweenMax.to(target, 0.5, {
      rotation: -180,
      x: 150
    });
  },
  profileMenuClose: target => {
    TweenMax.to(target, 0.5, {
      rotation: -360,
      x: 0
    });
  }
};
