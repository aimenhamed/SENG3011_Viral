import styled from  'styled-components';
import { palette } from '../common/palette/palette';

export const CreateReviewCard = styled.div`
  background-color: ${palette.white};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const SubmitButton =styled.div`
  background-color: ${palette.lightGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  font-size: 1.5rem;
  padding: 10px 0;
  margin: 10px 0;
  color: ${palette.white};
`

export const CancelButton = styled(SubmitButton)`
  background-color:  ${palette.purple};

`

export const Description = styled.textarea`
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  resize: none;
  font-size: 18px;
  font-family: Calibri, Helvetica, sans-serif;
`
