import React from 'react';
import styled from 'styled-components';
import { color, animation } from '../../../toolbox';

const Container = styled.div`
   display: flex;
   padding-left: 24px;
`;

const Button = styled.h3`
   padding: 12px 24px;
   background: ${color.bubbles[1]};
   color: white;
   margin: 0;
   font-weight: normal;
   border-radius: 8px;
   cursor: pointer;
   transition: all 0.15s ease;
   box-shadow: 0 5px 10px ${'#71d2e763'};
   animation: ${animation.fadeIn} 0.3s;
   display: ${props => props.canReroll ? 'block' : 'none'};

   &:hover {
      filter: brightness(110%);
   }
   &:active {
      filter: brightness(95%);
   }
`;

const RerollButton = ({ canReroll, onEvent }) => {
   const reroll = () => {
      onEvent({
         type: 'reroll'
      });
   };

   return (
      <Container>
         <Button canReroll={canReroll} onClick={reroll}>
            Reroll
         </Button>
      </Container>
   );
};

export default RerollButton;
