import { TweenMax, Elastic } from "gsap";

export default {
  shoesAppear: target => {
    TweenMax.to(target, 0.8, {
      y: 0,
      opacity: 1,
      rotationY: 0,
      ease: Elastic.easeInOut.config(1, 0.3)
    });
  },
  shoesMainBg: target => {
    TweenMax.to(target, 0.7, {
      opacity: 1,
      rotationY: 0,
      scale: 1,
      ease: Elastic.easeInOut
    }).delay(0.2);
  },
  headerAlign: target => {
    TweenMax.to(target, 0.7, {
      opacity: 1,
      x: -80,
      y: 150,
      width: "350px"
    }).delay(0.9);
  }
};
