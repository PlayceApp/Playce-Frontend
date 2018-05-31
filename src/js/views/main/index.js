import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from '../../components/logo';
import Bubble from '../../components/bubble';
import { animation, color } from '../../toolbox';

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding-top: 5vh;
   transition: all 0.5s ease;
   transform: ${props => (props.changingView ? 'scale(1.5)' : 'scale(1)')};
   opacity: ${props => (props.changingView ? 0 : 1)};
   animation: ${animation.scaleEnter} 0.5s;
`;

const MenuButtonContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   transition: 1s ease;
   opacity: ${props => (props.showButtons ? 1 : 0)};
`;

export default class MainView extends Component {
   state = {
      showButtons: false,
   };

   start = () => {
      this.props.onEvent({
         type: 'new-view',
         view: { name: 'categories', props: {} },
      });
   };

   about = () => {
      this.props.onEvent({
         type: 'new-view',
         view: { name: 'about', props: {} },
      });
   };

   beginAnimation() {
      setTimeout(() => {
         this.setState({ showButtons: true });
      }, 2300);
   }

   componentDidMount() {
      this.beginAnimation();
   }

   render() {
      const { changingView } = this.props;
      const { showButtons } = this.state;

      return (
         <Container changingView={changingView}>
            <Logo />
            <MenuButtonContainer showButtons={showButtons}>
               <Bubble
                  size="15vh"
                  text="About"
                  color={color.bubbles[1]}
                  onClick={this.about}
               />
               <Bubble
                  text="Start"
                  color={color.bubbles[2]}
                  onClick={this.start}
               />
               <Bubble
                  size="15vh"
                  text="My Playces"
                  color={color.bubbles[0]}
                  onClick={this.start}
               />
            </MenuButtonContainer>
         </Container>
      );
   }
}
