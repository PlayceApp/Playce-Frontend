import React, { Component } from 'react';
import styled from 'styled-components';
import Bubble from '../../components/bubble';
import { geolocated } from 'react-geolocated';
import { CheckCircle } from 'react-feather';
import { animation, color, Loader } from '../../toolbox';
import config from '../../config.json';
import ApiManager from '../../api_manager';

const Container = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   padding-top: 8vh;
   transition: all 0.5s ease;
   transform: ${props => (props.changingView ? 'scale(1.5)' : 'scale(1)')};
   opacity: ${props => (props.changingView ? 0 : 1)};
   animation: ${animation.scaleEnter} 0.5s;
   overflow: auto;
`;

const QuestionContainer = styled.div`
   padding: 10vh 0 2.5vh 0;
`;

const Title = styled.h2`
   font-size: 3em;
   text-align: center;
   margin: 0;
   line-height: 1.6;
   color: #252525;
`;

const Subtitle = styled.h3`
   font-size: 1.5em;
   font-weight: 300;
   text-align: center;
   margin: 0;
   line-height: 1.5;
   color: #252525;
`;

const LoadingContainer = styled.div`
   display: flex;
   justify-content: center;
   margin: 0.75vh 0;
   transition: all 0.35s ease;
   opacity: ${props => (props.hidden ? 0 : 1)};
`;

const MenuButtonContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   flex-wrap: wrap;
   width: 100%;
   transition: 1s ease;
`;

class CategoryView extends Component {
   state = {
      fetchingQuestions: false,
      receivedQuestions: false,
      gettingLocation: true,
      coords: { latitude: null, longitude: null }
   };

   static getDerivedStateFromProps(nextProps, prevState) {
      const { coords } = prevState;

      if (!coords.latitude && nextProps.coords) {
         return {
            gettingLocation: false,
            coords: {
               latitude: nextProps.coords.latitude,
               longitude: nextProps.coords.longitude
            }
         };
      }
      return null;
   }

   getQuestionnaire = category => {
      const api = new ApiManager();

      this.setState({ fetchingQuestions: true });

      api
         .getQuestionnaire(category)
         .then(questionnaire => {
            setTimeout(() => {
               this.setState({ receivedQuestions: true });
               setTimeout(() => {
                  this.props.onEvent({
                     type: 'new-view',
                     view: { name: 'questionnaire', props: {
                        questionnaire,
                        coords: this.state.coords,
                        category
                     }},
                  });
               }, 1000);
            }, 1000);
         })
         .catch(e => {
            console.error("Error: Can't fetch questionnaire: ", e);
         });
   };

   componentDidMount() {
      if (!this.props.isGeolocationAvailable) {
         console.error("Error: Can't find your location");
         return;
      }
   }

   getTitle = () => {
      const { fetchingQuestions, gettingLocation } = this.state;

      if (gettingLocation) {
         return  "Getting your location";
      } else if (fetchingQuestions) {
         return "Great";
      }
      return "Welcome!";
   }

   getSubtitle = () => {
      const { fetchingQuestions, gettingLocation } = this.state;

      if (gettingLocation) {
         return "Give us a sec...";
      } else if (fetchingQuestions) {
         return "We're grabbing the latest questions for you...";
      }
      return "Let's start by picking a category...";
   }

   render() {
      const { changingView } = this.props;
      const { fetchingQuestions, gettingLocation, receivedQuestions } = this.state;

      return (
         <Container changingView={changingView}>
            <QuestionContainer>
               <Title>{this.getTitle()}</Title>
               <Subtitle>{this.getSubtitle()}</Subtitle>
            </QuestionContainer>
            <LoadingContainer hidden={!gettingLocation && !fetchingQuestions}>
               {receivedQuestions ? (
                  <CheckCircle size={40} color="#56dc56" />
               ) : (
                  <Loader />
               )}
            </LoadingContainer>
            <MenuButtonContainer>
               {!gettingLocation && config.categories.map((category, index) => (
                  <Bubble
                     hidden={fetchingQuestions}
                     key={category.name}
                     text={category.name}
                     color={color.bubbles[index]}
                     onClick={() => this.getQuestionnaire(category.name)}
                  />
               ))}
            </MenuButtonContainer>
         </Container>
      );
   }
}

export default geolocated({
   positionOptions: {
      enableHighAccuracy: false,
   },
   userDecisionTimeout: 5000,
})(CategoryView);
