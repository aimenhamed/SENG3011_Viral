import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  /* justify-content: space-around; */
`;

export const SettingsButton = styled.button`
  height: 2.5em;
  width: 400px;
  color: #fff;
  background-color: #5dd29a;
  border-radius: 15px;
  border: none;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  margin: 20px auto;
  transition: 0.3s;
  :hover {
    background-color: #52c489;
  }
`;

export const Banner = styled.div`
  background-color: #effbf5;
  width: 100%;
  padding: 30px;
`;

export const SettingsContent = styled.div`
display:flex;
flex-direction: column;
justify-content; space-evenly;
padding-top: 50px;
`;
