import React, { Component } from 'react';
import styled from 'styled-components';
import { animation } from '../../toolbox';
import MapContainer from './components/map';
import YelpManager from './yelp_manager';
import Header from './components/header';
import Reviews from './components/reviews';
import Photos from './components/photos';
import DirectionsButton from './components/directions';
import SaveButton from './components/save';
import LoadingCover from './components/loading_cover';

const Container = styled.div`
   position: relative;
   display: flex;
   flex: 1;
   width: 100%;
   max-width: 80em;
   margin: 0 auto;
   transition: all 0.5s ease;
   transform: ${props => (props.changingView ? 'scale(1.5)' : 'scale(1)')};
   opacity: ${props => (props.changingView ? 0 : 1)};
   animation: ${animation.scaleEnter} 0.5s;
`;

const MapMapContainer = styled.div`
   position: relative;
   max-width: 20em;
   flex: 1;

   @media screen and (max-width: 750px) {
      display: none;
   }
`;

const InfoContainer = styled.div`
   flex: 1;
   overflow: auto;
`;

export default class ResultsView extends Component {
   constructor(props) {
      super(props);
      this.state = {
         business: {},
         reviews: [],
         businessId: null,
         ready: false,
         isSaved: false,
         results: props.results,
         currentResult: 0,
      };
   }

   handleEvent = options => {
      switch (options.type) {
         case 'update-playces':
            localStorage.playces = JSON.stringify(options.playces);
            this.checkIsSaved();
            break;
         default:
            return;
      }
   };

   checkIsSaved() {
      const { results, currentResult } = this.state;
      const playces = localStorage.playces
         ? JSON.parse(localStorage.playces)
         : [];
      for (let i in playces) {
         const playce = playces[i];
         if (playce.name === results[currentResult].name) {
            this.setState({ isSaved: true });
         }
         return;
      }
      this.setState({ isSaved: false });
   }

   getMap = () => {
      const { business } = this.state;
      const { name } = business;
      if (!name) return null;
      const address = business.location.address1;
      const { latitude, longitude } = business.coordinates;
      const position = { lat: latitude, lng: longitude };

      return (
         <MapMapContainer>
            <MapContainer position={position} />
            <DirectionsButton name={name} address={address} />
         </MapMapContainer>
      );
   };

   getBusinessDetails() {
      const { results, currentResult } = this.state;
      const { address, name } = results[currentResult];

      const yelp = new YelpManager({ address, name });
      yelp
         .getBusiness()
         .then(response => {
            const _id = response.businesses[0].id;
            yelp.getDetails(_id).then(business => {
               this.setState({ business });
            });
            yelp.getReviews(_id).then(reviews => {
               this.setState({
                  reviews,
                  ready: true,
               });
            });
         })
         .catch(e => {
            this.setState({ currentResult: currentResult + 1 });
            this.getBusinessDetails();
         });
   }

   componentDidMount() {
      this.getBusinessDetails();
      this.checkIsSaved();
   }

   render() {
      console.log(this.props);
      const {
         business,
         ready,
         results,
         reviews,
         isSaved,
         currentResult,
      } = this.state;
      const { rating, category } = results[currentResult];

      return (
         <Container changingView={false}>
            <LoadingCover isOpen={!ready} />
            <InfoContainer>
               <Header business={business} rating={rating} type={category} />
               <SaveButton
                  isSaved={isSaved}
                  result={results[currentResult]}
                  onEvent={this.handleEvent}
               />
               <Photos photos={business ? business.photos : null} />
               <Reviews reviews={reviews} />
            </InfoContainer>
            {this.getMap()}
         </Container>
      );
   }
}
