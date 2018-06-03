import React, { Component } from 'react';
import styled from 'styled-components';
import { animation, Loader } from '../../../toolbox';

const Container = styled.div`
   z-index: 100;
   position: absolute;
   background: white;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: ${props => (props.isOpen || props.isClosing ? 'flex' : 'none')};
   align-items: center;
   justify-content: center;
   animation: ${props => props.isClosing ? animation.fadeOut : animation.fadeIn} 0.3s;
`;

const LoadingContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-bottom: 10%;
`;

export default class LoadingCover extends Component {
   state = {
      isClosing: false,
   };

   animateClosed() {
      this.setState({
         isClosing: true,
      });

      setTimeout(() => {
         this.setState({
            isClosing: false,
         });
      }, 310);
   }

   componentDidUpdate(prevProps, prevState) {
      const closeRequested = prevProps.isOpen && !this.props.isOpen;
      if (closeRequested) {
         this.animateClosed();
      }
   }

   render() {
      const { isOpen } = this.props;
      const { isClosing } = this.state;

      return (
         <Container isOpen={isOpen || isClosing} isClosing={isClosing}>
            <LoadingContainer>
               <h2>Loading Playce...</h2>
               <Loader />
            </LoadingContainer>
         </Container>
      );
   }
}
