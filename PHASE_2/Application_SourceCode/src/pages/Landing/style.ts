import styled from "styled-components";
import { LandingPageBackdrop } from "src/components/common/image/imageIndex";

export const FullScreen = styled.div`
  background: url(${LandingPageBackdrop}) no-repeat center fixed;     
  background-size: cover;
  width: 100%;  
  height: 100vh;
  align-content: center;
`;

export const Title = styled.div`
padding-top: 10vh;  
display: flex;

  min-width: 800px;
  font-family: 'Calibri';
  font-style: normal;
  font-weight: 700;
  font-size: 4em;
  line-height: 86px;
  text-align: center;
  flex-direction: column;
  color: #FFFFFF;
`;

export const WelcomeMessage = styled.div`
  position: flex;
  font-family: 'Calibri';
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 43px;
  text-align: center;

  color: #FFFFFF;
`;

export const MenuButtons = styled.div`
  margin: 30px auto;
  width: 50%;
  max-width: 630px;
  min-width: 420px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
background-color: #FFFFFF;
height: 80px;
width: 200px;
border-radius: 5px;
border: none;
font-size: 24px;
font-weight: 600;
font-family: Calibri;
transition: background 0.3s ease;
:hover {
  background-color: #D0D0D0;
};
`

export const LoginModal = styled.div`
display: flex;
margin: auto;
flex-direction: column;
width: 100%;
max-width: 300px;
padding-bottom: 15px;
`

export const ModalTitle = styled.h2`
font-size: 28px;
`

export const GenericLabel = styled.label`
text-align: left;
margin-top: 5px;
font-size: 14px;
font-weight: 700;

`

export const GenericInput = styled.input`

margin: 5px 0px;
padding: 5px 0px;
padding-left: 5px;
font-size:  16px;
width: 100%;
box-sizing: border-box 
`

export const ModalButton =  styled.button`
border: none;
border-radius: 3px;
background-color: #D9D9D9;
font-weight: 600;
height: 40px;
width: 100px;
transition: background 0.3s ease;
margin: 20px auto;
  :hover {
    background-color: #D0D0D0;
  }
`

export const FakeButton = styled.button`
background-color: transparent;
padding: 5px;
margin: 5px;
border: none;
:hover {
  text-decoration: underline;
}
`

export const BadText = styled.div`
color: rgb(194, 7, 7);
background-color :rgb(253, 246, 246);
border-color: rgb(222, 117, 117);
border-width: 1px;
border-style: solid;
border-radius: 3px;
width: 100%;  
margin: 3px auto;
padding: 3px 5px;
`

export const GoodText = styled.div`
color: #52c489;  
background-color: #effbf5;
border-color: #52c489;  
border-width: 1px;
border-style: solid;
border-radius: 3px;
width: 100%;  
margin: 3x auto;
padding: 3px 5px;
`

export const LogoLanding = styled.img`
margin: auto;
height: 160px;
width: 160px;
margin-bottom: 30vh;
background-color: #fff;
padding: 1rem;
border-radius: 50%;
`
