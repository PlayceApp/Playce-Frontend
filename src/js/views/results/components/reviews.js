import React from 'react';
import styled from 'styled-components';
import { animation } from '../../../toolbox';

const Container = styled.div`
   margin-top: 24px;
   padding: 16px 0;
   animation: ${animation.fadeIn} 0.3s;
`;

const Header = styled.h2`
   margin: 0;
   padding: 0 24px;
`;

const Reviews = ({ reviews }) => {
   if (!reviews.reviews) return null;

   return (
      <Container>
         <Header>Reviews</Header>
         {reviews.reviews.map((review, index) => {
            const { user, text, rating } = review;
            return (
               <Review key={text} user={user} text={text} rating={rating} />
            );
         })}
      </Container>
   );
};

const ReviewContainer = styled.div`
   display: flex;
   margin: 16px 0 0 24px;
`;

const UserImage = styled.img`
   width: 3em;
   height: 3em;
   margin: 4px 16px;
   border-radius: 50%;
`;

const TextContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 80%;
   max-width: 35em;
`;

const ReviewText = styled.h3`
   font-weight: normal;
   margin: 0;
`;

const Author = styled.h4`
   margin: 8px 0;
`;

const Review = ({ user, text, rating }) => {
   const { image_url, name } = user;

   return (
      <ReviewContainer>
         <UserImage src={image_url || 'files/images/user.png'} />
         <TextContainer>
            <ReviewText>{`"${text}"`}</ReviewText>
            <Author>- {name}</Author>
         </TextContainer>
      </ReviewContainer>
   );
};

export default Reviews;
