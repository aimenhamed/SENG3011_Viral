import { Review } from "src/interfaces/ViralInterface";
import StarRating from 'react-star-ratings';
import { ProfileBox, ReviewCard, ReviewInfo } from "./style";
import Text from '../common/text/Text';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({review}: ReviewItemProps) => {
  console.log(review);
  return (
    <>
      <ReviewCard>
        <ProfileBox>
          <div style={{ width: '64px', height: '64px' }} />
          <Text>Profile 1</Text>
        </ProfileBox>
        <ReviewInfo>
          <Text bold fontSize="2rem">Title</Text>
          <StarRating rating={3} starRatedColor="#faaf00" starHoverColor="#faaf00" />
        </ReviewInfo>
      </ReviewCard>
    </>
)
}

export default ReviewItem;
