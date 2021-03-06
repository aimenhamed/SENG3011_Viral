import { useEffect, useState } from 'react';
import StarRating from 'react-star-ratings';
import { Review } from 'src/interfaces/ViralInterface'
import { useAppSelector } from 'src/logic/redux/hooks';
import { selectUser } from 'src/logic/redux/reducers/userSlice/userSlice';
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
  const { user } =  useAppSelector(selectUser);

  const [rating, setRating] = useState<number>(3);
  const [otherReviews, setOtherReviews] = useState<Review[]>();
  const [ownReview, setOwnReview] = useState<Review>();
  const [isNewReviewOpen, setNewReviewOpen] = useState<boolean>(false);



  useEffect(() => {
    setRating(averageRating);
    setOtherReviews(reviews.filter((r) => r.createdBy.userId !== user?.user.userId!));
    setOwnReview(reviews.find((r) => r.createdBy.userId === user?.user.userId!));
  }, [])

  const addOwnReview = (newReview: Review | undefined) => {
    setOwnReview(newReview);
  }

  const deleteOwnReview = () => {
    setOwnReview(undefined);
  }


  const renderReviews = () => {
    return (
      <>
        <TitleBlock>
          <Text fontSize="2rem" bold noMargin style={{flexGrow: 2}}>Reviews</Text>
          <AveRatingDiv>
            <Text fontSize="1rem" bold>{Math.round(rating * 10) / 10}/5</Text>
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
        ? <ReviewItem review={ownReview} isOwnReview deleteSelf={deleteOwnReview} />
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
          ? <CreateReview toggle={()=>setNewReviewOpen(false)} addReview={addOwnReview} />
          : renderReviews()
        }
      </GreenBox>
    </>

  )
}

export default ReviewBox;
