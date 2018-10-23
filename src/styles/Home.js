import styled from "styled-components";
import bg from "../images/mainOneBg.jpg";

export const Background = styled.div`
  height: 100vh;
  background: linear-gradient(
      45deg,
      rgba(102, 54, 247, 0.5) 0%,
      rgba(230, 40, 198, 0.3) 100%
    ),
    url(${bg});
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  padding-top: 300px;
  clip-path: polygon(0 0, 100% 10%, 100% 100%, 0 90%);
`;
export const PrimaryHeader = styled.h3`
  font-size: 5rem;
  color: #fff;
  word-wrap: break-word;
  letter-spacing: 0.25rem;
`;
export const SecondaryHeader = styled(PrimaryHeader)`
  font-size: 3rem;
  letter-spacing: 0;
`;
export const Wrap = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(102, 54, 247, 0.5),
    rgba(230, 40, 198, 0.3)
  );
`;
