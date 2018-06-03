import React, { Component } from 'react';
import styled from 'styled-components';
import { animation } from '../../toolbox';

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding-top: 6vh;
   transition: all 0.5s ease;
   transform: ${props => (props.changingView ? 'scale(1.5)' : 'scale(1)')};
   opacity: ${props => (props.changingView ? 0 : 1)};
   animation: ${animation.scaleEnter} 0.5s;
   overflow: auto;
`;

export default class AboutView extends Component {

   render() {
      const { changingView } = this.props;

      return (
         <Container changingView={changingView}>
            <h3>About</h3>
         </Container>
      );
   }
}
