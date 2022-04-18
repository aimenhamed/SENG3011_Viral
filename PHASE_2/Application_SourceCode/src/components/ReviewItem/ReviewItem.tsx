import { Review } from "src/interfaces/ViralInterface";
import StarRating from "react-star-ratings";
import * as AllIcons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteReviewDispatch,
  putUpvoteReviewDispatch,
} from "src/logic/redux/reducers/reviewSlice/reviewSlice";
import { useAppSelector } from "src/logic/redux/hooks";
import {
  IDeleteReviewRequestBody,
  IPutUpvoteReviewRequestBody,
} from "src/interfaces/ResponseInterface";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import { palette } from "../common/palette/palette";
import {
  ProfileBox,
  ReviewCard,
  ReviewInfo,
  ScrollableText,
  Voting,
  ReviewTitle,
  ReviewText,
  ReviewTop,
  IconWrapper,
  ProfileName,
} from "./style";

interface ReviewItemProps {
  review: Review;
  isOwnReview?: boolean;
  deleteSelf?: () => void;
}

const ReviewItem = ({ review, isOwnReview, deleteSelf }: ReviewItemProps) => {
  const dispatch = useDispatch();
  const { user } = useAppSelector(selectUser);

  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);
  const [upvoteCount, setUpvoteCount] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    setUpvoted(
      review.upvotedBy.filter((u) => u.userId === user?.user.userId).length > 0
    );
    setDownvoted(false);
    setRating(review.rating);
    setUpvoteCount(review.upvotedBy.length);
  }, []);

  useEffect(() => {
    const req: IPutUpvoteReviewRequestBody = {
      userId: user?.user.userId!,
      reviewId: review.reviewId,
      status: upvoted,
    };

    dispatch(putUpvoteReviewDispatch(req));
  }, [upvoted]);

  const upvoteReview = () => {
    if (upvoted) {
      setUpvoteCount(upvoteCount - 1);
    } else {
      setUpvoteCount(upvoteCount + 1);
    }
    setUpvoted(!upvoted);
    setDownvoted(false);
  };

  const downvoteReview = () => {
    setDownvoted(!downvoted);
    setUpvoted(false);
  };

  const deleteReview = () => {
    const req: IDeleteReviewRequestBody = {
      userId: user?.user.userId!,
      reviewId: review.reviewId,
    };

    dispatch(deleteReviewDispatch(req));
    if (deleteSelf) deleteSelf();
  };

  return (
    <>
      <ReviewCard
        style={{
          backgroundColor: isOwnReview ? palette.purple : palette.white,
          color: isOwnReview ? palette.white : palette.black,
        }}
      >
        <ProfileBox>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "grey",
              borderRadius: "50px",
            }}
          />
          <ProfileName>{review.createdBy.name}</ProfileName>
        </ProfileBox>
        <ReviewInfo>
          <ReviewTop>
            <ReviewTitle>{review.title}</ReviewTitle>
            <p>{new Date(review.date).toDateString()}</p>
            {isOwnReview && (
              <IconWrapper onClick={deleteReview}>
                <FontAwesomeIcon icon={AllIcons.faTrash} />
              </IconWrapper>
            )}
          </ReviewTop>

          <StarRating
            rating={rating}
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
          {upvoted ? (
            <IconWrapper color={palette.lightGreen} onClick={upvoteReview}>
              <FontAwesomeIcon icon={AllIcons.faArrowUp} />
            </IconWrapper>
          ) : (
            <IconWrapper
              color={isOwnReview ? palette.white : palette.black}
              onClick={upvoteReview}
            >
              <FontAwesomeIcon icon={AllIcons.faArrowUp} />
            </IconWrapper>
          )}
          <p>{upvoteCount}</p>
          {downvoted ? (
            <IconWrapper color="red" onClick={downvoteReview}>
              <FontAwesomeIcon icon={AllIcons.faArrowDown} />
            </IconWrapper>
          ) : (
            <IconWrapper
              color={isOwnReview ? palette.white : palette.black}
              onClick={downvoteReview}
            >
              <FontAwesomeIcon icon={AllIcons.faArrowDown} />
            </IconWrapper>
          )}
        </Voting>
      </ReviewCard>
    </>
  );
};

export default ReviewItem;
