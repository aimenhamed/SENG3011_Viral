import { useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';
import { Review } from 'src/interfaces/ViralInterface'
import { Filter } from '../common/image/imageIndex';
import { Image } from '../common/image/Image';
import Text from '../common/text/Text';
import { GreenBox } from './style';

interface ReviewProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewBox = ({reviews, averageRating}: ReviewProps) => {
  const [rating, setRating] = useState<number>(3);

  useEffect(() => {
    setRating(averageRating);
    console.log(rating);
  }, [])

  // const handleRating = (rate:number) => {
  //   setRating(rate);
  // }

  return (
    <>
      <GreenBox>
        <div>
            <Text>Average Rating</Text>
            <StarRating rating={rating} changeRating={(r) =>{setRating(r)}} starRatedColor="#faaf00" starHoverColor="#faaf00" />
        </div>
        <div>
          <Image src={Filter} height="24px" width="24px"></Image>
          <button type="button">
            
            Filter</button>
          <Text>Reviews: <b>{0}</b></Text>
        </div>
        <div>
          {reviews.map((r) =>
            <div>{r.reviewId}</div>
          )}
        </div>
        <div>
          <button type="button">Create New Review</button>
        </div>
      </GreenBox>
    </>
)
}

export default ReviewBox;
