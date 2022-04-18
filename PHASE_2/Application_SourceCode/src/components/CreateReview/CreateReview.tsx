import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { IPostReviewRequestBody } from "src/interfaces/ResponseInterface";
import { Review } from "src/interfaces/ViralInterface";
import { useAppSelector } from "src/logic/redux/hooks";
import { selectAdvice } from "src/logic/redux/reducers/adviceSlice/adviceSlice";
import { postReviewDispatch, ReviewLoadingStatusTypes, selectReview, selectReviewLoadingStatus } from "src/logic/redux/reducers/reviewSlice/reviewSlice";
import { selectUser } from "src/logic/redux/reducers/userSlice/userSlice";
import { BadText, GenericInput, GenericLabel } from "src/pages/Landing/style";
import Text from "../common/text/Text";
import { CreateReviewCard, SubmitButton, CancelButton,  Description } from "./style";

interface CreateReviewProps {
  toggle: ()=>void;
  addReview: (review: Review | undefined) => void
}

const CreateReview = ({toggle, addReview}: CreateReviewProps ) => {
  const dispatch = useDispatch();
  const { user } =  useAppSelector(selectUser);
  const { advice } = useAppSelector(selectAdvice);
  const { review } = useAppSelector(selectReview);
  const loadingStatus = useAppSelector(selectReviewLoadingStatus);

  const [rating,  setRating]= useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>();

  useEffect(() => {
    if (loadingStatus === ReviewLoadingStatusTypes.POST_REVIEW_COMPLETED) {
      console.log('new Review')
      console.log(review?.review!);
      addReview(review?.review!);
      toggle();
    } else if  (loadingStatus === ReviewLoadingStatusTypes.POST_REVIEW_FAILED) {
      setErrMsg(`Failed to send review to server. Please try again later.`)
    }
  }, [loadingStatus])

  const submitReview = () => {
    if (rating === 0 || title === "" || details === ""){
      setErrMsg("All fields cannot be empty");
      return;
    }
    const req: IPostReviewRequestBody = {
      userId: user?.user.userId!,
      countryId: advice?.country.countryId!,
      rating,
      title,
      mainText: details,
    }
    dispatch(postReviewDispatch(req));
  }


  return (
    <>
      <CreateReviewCard>
        <Text bold fontSize="2rem">Create a New Review</Text>
        {errMsg && <BadText>{errMsg}</BadText>}
        <GenericLabel>Title</GenericLabel>
        <GenericInput type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <GenericLabel>Rating</GenericLabel>
        <StarRatings
          rating={rating}
          changeRating={(newRating)=>setRating(newRating)}
          starRatedColor="#faaf00"
          starHoverColor="#faaf00"
          starDimension="30px"
          starSpacing="3px"
        />
        <GenericLabel>Details</GenericLabel>
        <Description placeholder="Details" onChange={(e)=>setDetails(e.target.value)} />
        <div>
          <SubmitButton onClick={submitReview}>Post Review</SubmitButton>
          <CancelButton onClick={toggle}>Cancel</CancelButton>
        </div>

      </CreateReviewCard>
    </>
)
}

export default  CreateReview;
