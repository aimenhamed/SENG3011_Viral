import styled from 'styled-components';
import { palette } from '../common/palette/palette';

export const ReviewCard = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 10px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const ProfileBox = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 100px;
`

export const ProfileName  = styled.p`

`

export const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  
`

export const ScrollableText =  styled.div`
overflow-y: auto; 
max-height: 150px; 
padding: 0 5px;

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
`

export const Voting = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
gap: 10px;
`

export const ReviewTitle = styled.h3`
  flex-grow: 2;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`

export const ReviewText = styled.p`
  margin: 0;
`

export const  ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`

type IconWrapperProps = {
  color?: string,
  hoverColor?: string
}

export const IconWrapper = styled.button < IconWrapperProps > `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: transparent;
  border: none;
  height: 24px;
  width: 24px;
  color: ${props => props.color ? props.color : palette.white};
  :hover {
    background-color: ${props => props.hoverColor ? props.hoverColor : palette.lightGreen}
  }
`
