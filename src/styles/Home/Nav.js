import styled from 'styled-components';
import {Menu, Modal, Icon} from 'semantic-ui-react';

export const MenuBtn = styled(Icon)`
    &&&&{
        position: fixed;
        top: 1rem;
        right: 3rem;
        width: 6rem;
        z-index: 10;
        color: #fff;
        font-size: 4rem;
        background-color: rgb(0, 0, 0);
        transition: all 0.5s;
        border: 3px solid #fff;
      }

      &:hover {
        transform: scale(1.15);
        cursor: pointer;
      }
    
`;
export const Navwrap = styled.div`
    display: block;
    position: fixed;
    padding: 0.5rem 0;
    top: 2rem;
    right: 4rem;
    min-width: 8rem;
    
      
    ul {
        display: flex;
        float: right;
        list-style: none;
        width: 7rem;
        justify-content: space-around;
        flex-direction: column;
        transition: all 0.5s;

      &.disabled {
        height: 0;
        margin-top: 4rem;
      }

      &.active {
        height: 30rem;
        margin-top: 7rem;
      }

        li {
          font-size: 2.5rem;
          text-align: right;
          border-radius: 50px;
          text-align: center;
          transition: all 0.5s;
          position: relative;
          margin: auto;

          i {
            font-size: 2.5rem;
            color: ${p => p.theme.colorWhite};
            transition: all 0.5s;
            position: absolute;
          }

          span {  
            display: inline-block;
            opacity: 0;
            color: ${p => p.theme.colorWhite};
            transition: all 0.5s;
            position: absolute;
          }
          span, i {
            top: 0;
            left: 0;
            transform: translate(-50%, -50%)
          }

          &:hover {
            cursor: pointer;
            span {
              opacity: 1;
            }
            i {
              opacity: 0;
            }
          }
        }
      }
`;

export const LoginSignupMenu = styled(Menu)`
      &&&&& {
            margin-right: 15rem;
            background-color: transparent;
            font-size: 1.5rem;
            margin-top: 2.5rem;
      }
`;

export const LoginSignupModal = styled(Modal)`
      &&&&& {
        padding: 2rem;
        
        form, button {
          font-size: 1.5rem;
        }

        h2 {
          font-size: 2rem;
        }
        button {
          margin: 1rem 0;
        }
      }
`;
