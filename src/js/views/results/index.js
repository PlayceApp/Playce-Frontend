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
   state = {
      business: {},
      reviews: [],
      businessId: null,
      ready: false,
      isSaved: false,
      results: [
         {
            address: '339 Marsh St San Luis Obispo CA 93401 USA',
            category: 'restaurant',
            latitude: 35.2871,
            longitude: -120.665,
            name: 'Frame Works',
            price: 2,
            rating: 3.5,
         },
      ],
   };

   handleEvent = (options) => {
      switch(options.type) {
         case 'update-playces':
            localStorage.playces = JSON.stringify(options.playces);
            this.checkIsSaved();
         break;
         default:
            return;
      }
   }

   checkIsSaved() {
      const { results } = this.state;
      const playces = localStorage.playces ? JSON.parse(localStorage.playces) : [];
      for (let i in playces) {
         const playce = playces[i];
         if (playce.name === results[0].name) {
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
      const { results } = this.state;
      const { address, name } = results[0];

      const yelp = new YelpManager({ address, name });
      yelp.getBusiness()
         .then(response => {
            const _id = response.businesses[0].id;
            yelp.getDetails(_id)
               .then(business => {
                  this.setState({ business });
               });
            yelp.getReviews(_id)
               .then(reviews => {
                  this.setState({
                     reviews,
                     ready: true
                  });
               });
         })
         .catch(e => {
            console.log(e);
         });
   }

   componentDidMount() {
      this.getBusinessDetails();
      this.checkIsSaved();
   }

   render() {
      const { business, ready, results, reviews, isSaved } = this.state;
      const { rating, category } = results[0];

      return (
         <Container changingView={false}>
            <LoadingCover isOpen={!ready} />
            <InfoContainer>
               <Header business={business} rating={rating} type={category} />
               <SaveButton isSaved={isSaved} result={results[0]} onEvent={this.handleEvent} />
               <Photos photos={business ? business.photos : null}/>
               <Reviews reviews={reviews} />
            </InfoContainer>
            {this.getMap()}
         </Container>
      );
   }
}
