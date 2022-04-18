import styled from "styled-components";
import { palette } from "../common/palette/palette";

export const GreenBox = styled.div`
  background-color: ${palette.lightGreen};
  border-radius: 20px;
  border: 1px solid #5dd29a;
  box-sizing: border-box;
  padding: 20px 40px;
  max-height: 600px;
`;

export const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

export const AveRatingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const FilterButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  gap: 10px;
  font-size: 24px;
  transition: 0.3s;
  padding: 10px 20px;
  border-radius: 5px;
  :hover {
    background-color: ${palette.selectedGreen};
  }
`;

export const FilterReviews = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type ReviewHolderProps = {
  height?: string;
};

export const ReviewHolder = styled.div<ReviewHolderProps>`
  overflow-y: auto;
  max-height: ${(props) => (props.height ? props.height : "300px")};
  padding: 0 5px;
  margin: 10px 0;
  borderradius: 10px 10px 50px 10px;

  ::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const CreateReviewBtn = styled.button`
border: none;
font-size: 1.5rem;
font-weight: 500;
width: 100%;
padding: 10px;
color: ${palette.white};
background-color: ${palette.purple};
border-radius: 10px;
drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
