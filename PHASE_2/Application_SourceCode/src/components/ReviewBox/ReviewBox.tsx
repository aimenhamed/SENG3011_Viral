import { useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';
import { Review } from 'src/interfaces/ViralInterface'
import { Filter } from '../common/image/imageIndex';
import { Image } from '../common/image/Image';
import Text from '../common/text/Text';
import { GreenBox, TitleBlock,  AveRatingDiv, FilterButton, FilterReviews, ReviewHolder, CreateReviewBtn } from './style';
import ReviewItem from '../ReviewItem/ReviewItem';
import CreateReview from '../CreateReview/CreateReview';

interface ReviewProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewBox = ({reviews, averageRating}: ReviewProps) => {
  const [rating, setRating] = useState<number>(3);
  const [otherReviews, setOtherReviews] = useState<Review[]>();
  const [ownReview, setOwnReview] = useState<Review>();
  const [isNewReviewOpen, setNewReviewOpen] = useState<boolean>(false);

  useEffect(() => {
    setRating(averageRating);
    setOtherReviews(reviews.filter((r) => r.createdBy.userId !== '0985fec7-f5ed-4c96-85f4-733627004ab4'));
    setOwnReview(reviews.find((r) => r.createdBy.userId === '0985fec7-f5ed-4c96-85f4-733627004ab4'));
  }, [])


  const renderReviews = () => {
    return (
      <>
        <TitleBlock>
          <Text fontSize="2rem" bold noMargin style={{flexGrow: 2}}>Reviews</Text>
          <AveRatingDiv>
            <Text fontSize="1rem" bold>{rating}/5</Text>
            <StarRating
              rating={rating}
              starRatedColor="#faaf00"
              starHoverColor="#faaf00"
              starDimension="40px"
              starSpacing='5px'
            />
          </AveRatingDiv>
        </TitleBlock>
        <FilterReviews>
          <FilterButton type="button"><Image src={Filter} height="24px" width="24px" />Filter</FilterButton>
          <Text fontSize="24px">Reviews: <b>{reviews.length}</b></Text>
        </FilterReviews>
        <ReviewHolder height={ownReview ? '200px' : '300px'}>
          {otherReviews && otherReviews.map((r) =>
            <ReviewItem key={r.reviewId} review={r} />
        )}
        </ReviewHolder>
        { ownReview
        ? <ReviewItem review={ownReview} isOwnReview />
        : <CreateReviewBtn onClick={()=>setNewReviewOpen(true)}>Create New Review</CreateReviewBtn>
      }
      </>
)
  }

  return (
    <>
      <GreenBox>
        {
          isNewReviewOpen
          ? <CreateReview toggle={()=>setNewReviewOpen(false)} />
          : renderReviews()
        }
      </GreenBox>
    </>

  )
}

export default ReviewBox;
