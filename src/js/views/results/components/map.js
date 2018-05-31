import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Loader } from '../../../toolbox';

const LoadingContainer = () => (
   <Loader />
);

export class MapContainer extends Component {
   render() {
      const { position } = this.props;

      return (
         <Map google={this.props.google} zoom={18} initialCenter={position}>
            <Marker position={position} />
         </Map>
      );
   }
}

export default GoogleApiWrapper({
   apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo',
   LoadingContainer: LoadingContainer
})(MapContainer);
