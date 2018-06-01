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
   state = {
      results: [
         {
            address: '667 Marsh St San Luis Obispo CA 93401',
            category: 'restaurant',
            latitude: 35.2774,
            longitude: -120.664,
            name: 'Sumo Sushi',
            price: 2,
            rating: 3.5,
         },
      ],
   };

   getMap = () => {
      const { results } = this.state;
      const currResult = results[0];
      const { latitude, longitude } = currResult;
      const position = { lat: latitude, lng: longitude };

      return (
         <MapMapContainer>
            <MapContainer position={position} />
         </MapMapContainer>
      );
   };

   render() {
      //const { changingView } = this.props;
      const position = { lat: 35.282752, lng: -120.659616 };

      return (
         <Container changingView={false}>
            {this.getMap()}
            <InfoContainer>
               <h3>Results</h3>
            </InfoContainer>
         </Container>
      );
   }
}
