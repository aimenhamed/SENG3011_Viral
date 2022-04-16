import { useState } from "react";
import StarRatings from "react-star-ratings";
import { GenericInput, GenericLabel } from "src/pages/Landing/style";
import Text from "../common/text/Text";
import { CreateReviewCard, SubmitButton, CancelButton,  Description } from "./style";

interface CreateReviewProps {
  toggle: ()=>void;
}

const CreateReview = ({toggle}: CreateReviewProps ) => {
  const [rating,  setRating]= useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const submitReview = () => {
    console.log(title);
    console.log(rating);
    console.log(details);
  }


  return (
    <>
      <CreateReviewCard>
        <Text bold fontSize="2rem">Create a New Review</Text>
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
