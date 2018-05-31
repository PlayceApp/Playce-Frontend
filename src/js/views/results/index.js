import React, { Component } from 'react';
import styled from 'styled-components';
import { animation } from '../../toolbox';
import MapContainer from './components/map';

const Container = styled.div`
   display: flex;
   flex: 1;
   transition: all 0.5s ease;
   transform: ${props => (props.changingView ? 'scale(1.5)' : 'scale(1)')};
   opacity: ${props => (props.changingView ? 0 : 1)};
   animation: ${animation.scaleEnter} 0.5s;
   overflow: auto;
`;

const MapMapContainer = styled.div`
   position: relative;
   max-width: 20em;
   flex: 1;
`;

const InfoContainer = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
`;

export default class ResultsView extends Component {
   render() {
      const { changingView } = this.props;
      const position = { lat: 35.282752, lng: -120.659616 };
      console.log(this.props);

      return (
         <Container changingView={changingView}>
            <MapMapContainer>
               <MapContainer position={position}/>
            </MapMapContainer>
            <InfoContainer>
               <h3>Results</h3>
            </InfoContainer>
         </Container>
      );
   }
}
