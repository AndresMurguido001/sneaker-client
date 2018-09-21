import { TweenMax, Elastic } from "gsap";

export default {
  showSearchBar: target => {
    TweenMax.to(target, 0.8, {
      opacity: 1,
      scale: 1,
      ease: Elastic.easeInOut
    });
  },
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
