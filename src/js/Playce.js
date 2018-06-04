import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import SFProDisplay from '../fonts/SF-Pro-Display-Regular.otf';
import Header from './components/header';
import MainView from './views/main/index';
import CategoryView from './views/category/index';
import AboutView from './views/about/index';
import QuestionnaireView from './views/questionnaire/index';
import ResultsView from './views/results/index';
import MyPlaycesView from './views/playces/index';

injectGlobal`
   @font-face {
      font-family: SFProDisplay;
      src: url('${SFProDisplay}') format('opentype');
   }

   @font-face {
      font-family: yikes;
      src: url('files/fonts/yikes.ttf') format('truetype');
   }
`;

const Container = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   flex-direction: column;
`;

const ViewContainer = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;
   transition: all 0.4s ease;
   opacity: ${props => (props.hidden ? 0 : 1)};
`;

const views = {
   main: <MainView />,
   playces: <MyPlaycesView />,
   categories: <CategoryView />,
   questionnaire: <QuestionnaireView />,
   about: <AboutView />,
   results: <ResultsView />,
};

export default class Playce extends Component {
   state = {
      viewStack: [{ name: 'main', props: {} }],
      changingView: false,
      emptyingViews: false,
   };

   handleEvent = options => {
      switch (options.type) {
         case 'new-view':
            this.newView(options);
            break;
         case 'empty-view-stack':
            this.emptyViewStack();
            break;
         default:
            console.error('Error: Empty event');
            break;
      }
   };

   emptyViewStack = () => {
      this.setState({ emptyingViews: true });

      setTimeout(() => {
         this.setState(state => {
            state.viewStack = state.viewStack.slice(0, 1);
            state.emptyingViews = false;
            return state;
         });
      }, 500);
   };

   newView(options) {
      const { view } = options;

      this.setState({ changingView: true });

      setTimeout(() => {
         this.setState(state => {
            state.changingView = false;
            state.viewStack.push(view);
            return state;
         });
      }, 500);
   }

   getCurrentView = () => {
      const { viewStack, changingView } = this.state;
      const currentView = viewStack[viewStack.length - 1];
      const view = views[currentView.name];
      let props = {
         ...currentView.props,
         changingView,
      };
      props.onEvent = this.handleEvent;

      try {
         return React.cloneElement(view, props);
      } catch (e) {
         console.error('Error: this sidebar view is broken');
      }
   };

   render() {
      const { viewStack, emptyingViews } = this.state;

      return (
         <Container>
            <Header
               hidden={viewStack.length === 1}
               onEvent={this.handleEvent} />
            <ViewContainer hidden={emptyingViews}>
               {this.getCurrentView()}
            </ViewContainer>
         </Container>
      );
   }
}
