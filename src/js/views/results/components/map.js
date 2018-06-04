import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Loader, animation } from '../../../toolbox';

const Container = styled.div`
   animation: ${animation.fadeIn} 0.3s;
`;

const LoadingContainer = () => <Loader />;

export class MapContainer extends Component {
   render() {
      const { position } = this.props;

      return (
         <Container>
            <Map google={this.props.google} zoom={18} initialCenter={position}>
               <Marker position={position} />
            </Map>
         </Container>
      );
   }
}

export default GoogleApiWrapper({
   apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo',
   LoadingContainer: LoadingContainer,
})(MapContainer);
