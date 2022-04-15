import { useState } from "react";
import StarRatings from "react-star-ratings";
import { GenericInput } from "src/pages/Landing/style";
import Text from "../common/text/Text";
import { CreateReviewCard } from "./style";

interface CreateReviewProps {
  toggle: ()=>void;
}

const CreateReview = ({toggle}: CreateReviewProps ) => {
  const [rating,  setRating]= useState<number>(0);

  return (
    <>
      <CreateReviewCard>
        <Text>Create a New Review</Text>
        <GenericInput type="text" />
        <StarRatings
          rating={rating}
          changeRating={(newRating)=>setRating(newRating)}
          starRatedColor="#faaf00"
          starHoverColor="#faaf00"
        />
        <textarea />
        <button type="button">Submit Review</button>
        <button type="button" onClick={toggle}>Cancel</button>
      </CreateReviewCard>
    </>
)
}

export default  CreateReview;
