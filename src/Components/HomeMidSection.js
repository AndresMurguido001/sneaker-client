import React from "react";
import styled from "styled-components";
import midSectionBg from "../images/midSectionBg.jpg";
import { Icon, Header } from "semantic-ui-react";

let MidWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  background: url(${midSectionBg});
  background-attachment: fixed;
  justify-content: space-evenly;
  background-size: cover;
  background-position: center;
  padding: 10rem 0;
  clip-path: polygon(0 10%, 100% 0, 100% 90%, 0% 100%);
`;

let MidColumns = styled.div`
  border: 3px solid #fff;
  border-radius: 20px;
  background: linear-gradient(
    to bottom,
    rgba(28, 76, 142, 0.5) 0%,
    rgba(145, 79, 147, 0.5) 100%
  );
  box-shadow: 10px 10px 22px 0px rgba(0, 0, 0, 0.75);
  width: 20rem;
  color: #fff;
  height: 30rem;
  padding: 20px;
  margin: 20px 0;
`;

export default () => (
  <MidWrapper>
    <MidColumns>
      <Icon name="upload" size="huge" circular inverted />
      <Header style={{ color: "#fff" }} as="h3" content="Upload your shoes" />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis,
        ab quibusdam! Veritatis tempora ullam distinctio! Nam laborum
        repellendus possimus fugit iure ab quisquam, et placeat odio saepe hic
        iusto ratione suscipit? Quas, ipsam quasi quam temporibus dolore
        suscipit sed vel.
      </p>
    </MidColumns>
    <MidColumns>
      <Icon name="desktop" size="huge" circular inverted />
      <Header style={{ color: "#fff" }} as="h3" content="Show the world" />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis,
        ab quibusdam! Veritatis tempora ullam distinctio! Nam laborum
        repellendus possimus fugit iure ab quisquam, et placeat odio saepe hic
        iusto ratione suscipit? Quas, ipsam quasi quam temporibus dolore
        suscipit sed vel.
      </p>
    </MidColumns>
    <MidColumns>
      <Icon name="stripe card" size="huge" circular inverted />
      <Header style={{ color: "#fff" }} as="h3" content="Collect your cash" />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis,
        ab quibusdam! Veritatis tempora ullam distinctio! Nam laborum
        repellendus possimus fugit iure ab quisquam, et placeat odio saepe hic
        iusto ratione suscipit? Quas, ipsam quasi quam temporibus dolore
        suscipit sed vel.
      </p>
    </MidColumns>
  </MidWrapper>
);
