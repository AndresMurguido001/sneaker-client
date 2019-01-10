import styled from "styled-components";
import { Menu, Modal } from "semantic-ui-react";

export const LoginSignupMenu = styled(Menu)`
  &&&&& {
    margin-right: 15rem;
    background-color: transparent;
    font-size: 1.2rem;
    margin-top: 2.5rem;
  }
`;

export const LoginSignupModal = styled(Modal)`
  &&&&& {
    padding: 2rem;

    form,
    button {
      font-size: 1.2rem;
    }

    h2 {
      font-size: 2rem;
    }
    button {
      margin: 1rem 0;
    }
  }
`;
