import styled from "styled-components";

export const Search = styled.div`
  background-color: #555cb8;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GenericInput = styled.input`
  margin: 5px 0px;
  padding-left: 5px;
  font-size: 1rem;
  width: 40%;
  box-sizing: border-box;
`;

export const Results = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  overflow-y: scroll;
`;

export const ButtonLockup = styled.div`
  display: flex;
  justify-content: center;
`;

export const SearchButton = styled.button`
  margin: 1rem 0;
  border-radius: 0.5rem;
  border: none;
  background: #1aa562;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;

  :hover {
    background: #008c48;
  }
`;
