import React, { Component } from 'react';
import styled from 'styled-components';

const BubbleContainer = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   min-height: ${props => props.size || '20vh'};
   min-width: ${props => props.size || '20vh'};
   background: ${props => props.color || 'dodgerblue'};
   margin: 1em;
   border-radius: 50%;
   color: white;
   font-family: 'GT Walsheim';
   cursor: pointer;
   animation: ${props => props.isEntering ? 'bubbleEnter 2s ease' : 'revolve 10s infinite'};
   transition: all 1s ease;
   opacity: ${props => props.clicked || props.hidden ? 0 : 1};
   pointer-events: ${props => props.clicked || props.hidden ? 'none' : 'default'};
   &:nth-child(2n) {
      animation: ${props => props.isEntering ? 'bubbleEnterOpposite 2s ease' : 'revolveOpposite 15s infinite'};
   }

   &:hover {
      filter: brightness(1.1);
      transition: all 0.25s ease;
   }

   @keyframes revolve {
      from {
         -webkit-transform: rotate(0deg) translateX(10px) rotate(0deg);
      }
      to {
         -webkit-transform: rotate(360deg) translateX(10px) rotate(-360deg);
      }
   }

   @keyframes revolveOpposite {
      from {
         -webkit-transform: rotate(0deg) translateX(-10px) rotate(0deg);
      }
      to {
         -webkit-transform: rotate(-360deg) translateX(-10px) rotate(360deg);
      }
   }

	@keyframes bubbleEnter {
		0% {
			transform: scale(0) translateY(100vh) translateX(100vw);
			opacity: 0;
		}

		60% {
			opacity: 1;
			transform: scale(1) translateY(0px) translateX(0px);
		}
		100% {
			-webkit-transform: scale(1) rotate(0deg) translateX(10px) rotate(0deg);
		}
	}

    @keyframes bubbleEnterOpposite {
       0% {
          transform: scale(0) translateY(200vh) translateX(100vw);
          opacity: 0;
       }

       70% {
          opacity: 1;
          transform: scale(1) translateY(0px) translateX(0px);
       }
       100% {
          -webkit-transform: scale(1) rotate(0deg) translateX(-10px) rotate(0deg);
       }
    }

`;

const InnerBubble = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   margin: auto;
   display: ${props => props.clicked ? 'block' : 'none'};
   animation: pop 0.5s cubic-bezier(.17, .89, .32, 1.49);
   border-radius: 50%;
   background: white;

   @keyframes pop {
      0%,
      17.5% {
         transform: scale(0);
      }
   }
`;

const Text = styled.h3`
   font-weight: 400;
`;

export default class Bubble extends Component {
   state = {
      clicked: false,
   };

   handleClick = () => {
      this.setState({ clicked: true });
      setTimeout(() => {
         this.props.onClick();
      }, 500);
   };

   componentDidMount() {
      this.setState({ isEntering: true });
      setTimeout(() => {
         this.setState({ isEntering: false });
      }, 1990);
   }

   render() {
      const { text, color, size, hidden } = this.props;
      const { isEntering, clicked } = this.state;

      return (
         <BubbleContainer
            hidden={hidden}
            isEntering={isEntering}
            clicked={clicked}
            size={size}
            color={color}
            onClick={this.handleClick}>
            <Text>{text || 'Empty Bubble'}</Text>
            <InnerBubble clicked={clicked}/>
         </BubbleContainer>
      );
   }
}
