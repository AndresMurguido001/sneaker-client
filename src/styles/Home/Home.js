import styled, { css } from "styled-components";
// import { Button } from "semantic-ui-react";
import { rgba } from "polished";

export const HeadingPrimary = styled.h2`
  font-size: 6rem;
  text-transform: uppercase;
  letter-spacing: 1.5rem;
  width: 40rem;
  border: 5px solid ${p => p.theme.colorWhite};
  color: ${p => p.theme.colorWhite};
  padding: 12rem 0 5rem 2rem;
  margin-left: 0;
  margin-bottom: 4rem;
  && {
    margin-top: 6rem;
  }
`;

export const HeadingSecondary = styled.h2`
  font-size: 6rem;
  color: ${p => p.theme.colorWhite};
  text-transform: uppercase;
  font-weight: 200;
  width: 90%;
  margin: auto;
  position: relative;

  ${p =>
    p.mb &&
    css`
      margin-bottom: ${p.mb}rem;
    `}

  ${p =>
    p.underlined &&
    css`
      &:before,
      &:after {
        content: "";
        position: absolute;
        bottom: -1rem;
        left: -1rem;
      }

      &:before {
        top: -3px;
        width: 0.8rem;
        background-image: -webkit-gradient(
          linear,
          0 100%,
          0 0,
          from(${p.theme.colorGreyLight}),
          to(transparent)
        );
        background-image: -webkit-linear-gradient(
          transparent,
          ${p.theme.colorGreyLight}
        );
        background-image: -moz-linear-gradient(
          transparent,
          ${p.theme.colorGreyLight}
        );
        background-image: -o-linear-gradient(
          transparent,
          ${p.theme.colorGreyLight}
        );
      }

      &:after {
        right: -3px;
        height: 0.8rem;
        background-image: -webkit-gradient(
          linear,
          0 0,
          100% 0,
          from(${p.theme.colorGreyLight}),
          to(transparent)
        );
        background-image: -webkit-linear-gradient(
          left,
          ${p.theme.colorGreyLight},
          transparent
        );
        background-image: -moz-linear-gradient(
          left,
          ${p.theme.colorGreyLight},
          transparent
        );
        background-image: -o-linear-gradient(
          left,
          ${p.theme.colorGreyLight},
          transparent
        );
      }
    `}
`;

export const Section = styled.section`
  height: ${p => (p.height ? p.height : `auto`)};
  padding: 5rem 0;
  background: ${p =>
    p.background
      ? `linear-gradient(120deg, ${rgba(p.theme.colorPrimary, 0.5)} 0%, ${rgba(
          p.theme.colorPrimary,
          0.5
        )} 50%, ${rgba(p.theme.colorPrimaryLight, 0.5)} 100%), url(${
          p.background
        });`
      : p.theme.colorGreyLight};
  background-size: cover;
  background-position: center;
  ${p =>
    p.midSection &&
    css`
      background: linear-gradient(
          120deg,
          ${rgba(p.theme.colorPrimary, 0.8)} 0%,
          ${rgba(p.theme.colorPrimary, 0.8)} 50%,
          ${rgba(p.theme.colorPrimaryLight, 0.8)} 100%
        ),
        url(${p.midSection});
      background-size: cover;
    `}
`;

export const Centered = styled.div`
  display: block;
  width: 30rem;
  margin: auto;
  text-align: center;
`;

export const LatestDisplay = styled.div`
  display: block;
  height: 30rem;
  background-color: #f6f6f6;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  position: relative;
  border-radius: 5px;

  ${p =>
    p.image &&
    css`
      background-image: url(${p.image});
      &:hover {
        background-image: linear-gradient(
            to bottom,
            ${rgba(p.theme.colorWhite, 0.5)},
            ${rgba(p.theme.colorWhite, 0.5)}
          ),
          url(${p.image});

        & > h3 {
          opacity: 1;
        }
      }
    `}
`;

export const ShoeTitle = styled.h3`
  font-size: 1.4rem;
  opacity: 0;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 1rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
`;

export const BtnBasic = styled.a`
  display: block;
  width: 20rem;
  height: 3rem;
  margin: 7rem auto;
  position: relative;

  &&.basicBtn--secondary {
    text-decoration: none;
    color: ${p => p.theme.colorWhite};
    font-size: 1.8rem;
    text-transform: uppercase;
    transition: transform 0.3s;

    &:before {
      content: "";
      position: absolute;
      bottom: -10px;
      height: 3px;
      width: 0rem;
      background-image: linear-gradient(
        to right,
        ${p => p.theme.colorWhite},
        ${p => p.theme.colorGreyLight}
      );
      transition: all 0.3s;
    }

    &:hover {
      cursor: pointer;
      transform: skewX(-10deg);

      &:before {
        width: 12rem;
      }
    }
  }
`;

export const Content = styled.div`
  display: inline-block;
  width: ${p => (p.width ? p.width : "40rem")};
  border: ${p => (p.bordered ? `5px solid ${p.theme.colorWhite}` : "none")};
  height: ${p => (p.height ? p.height : "40rem")};
  padding-top: 8rem;
  margin: 5rem 0;
`;

export const Paragraph = styled.p`
  line-height: 2em;
  font-size: 1.2rem;
  color: ${p => p.theme.colorWhite};
  text-indent: 5rem;
`;
