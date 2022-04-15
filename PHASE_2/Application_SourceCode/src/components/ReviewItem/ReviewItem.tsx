import { Review } from "src/interfaces/ViralInterface";
import StarRating from 'react-star-ratings';
import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileBox, ReviewCard, ReviewInfo, ScrollableText,  Voting, ReviewTitle, ReviewText, ReviewTop, IconWrapper } from "./style";
import { palette } from "../common/palette/palette";

interface ReviewItemProps {
  review: Review;
  isOwnReview?: boolean;
}

const ReviewItem = ({review, isOwnReview}: ReviewItemProps) => {
  console.log(review);
  return (
    <>
      <ReviewCard style={{
        backgroundColor: isOwnReview ? palette.purple : palette.white,
        color: isOwnReview ? palette.white : palette.black,
        }}
      >
        <ProfileBox>
          <div style={{ width: '64px', height: '64px', backgroundColor: 'grey', borderRadius: '50px' }} />
          <p>{review.createdBy.name}</p>
        </ProfileBox>
        <ReviewInfo>
          <ReviewTop>
            <ReviewTitle>{review.title}</ReviewTitle>
            <p>{new Date(review.date).toDateString()}</p>
            {isOwnReview && (
            <IconWrapper>
              <FontAwesomeIcon icon={AllIcons.faTrash} />
            </IconWrapper>
)}
          </ReviewTop>

          <StarRating
            rating={3}
            starRatedColor="#faaf00"
            starHoverColor="#faaf00"
            starDimension="15px"
            starSpacing="3px"
          />
          <ScrollableText>
            <ReviewText>{review.mainText}</ReviewText>
          </ScrollableText>

        </ReviewInfo>
        <Voting>
          <IconWrapper color={isOwnReview ? palette.white : palette.black}>
            <FontAwesomeIcon icon={AllIcons.faArrowUp} />
          </IconWrapper>
          <p>40</p>
          <IconWrapper color={isOwnReview ? palette.white : palette.black}>
            <FontAwesomeIcon icon={AllIcons.faArrowDown} />
          </IconWrapper>

        </Voting>
      </ReviewCard>
    </>
)
}

export default ReviewItem;
