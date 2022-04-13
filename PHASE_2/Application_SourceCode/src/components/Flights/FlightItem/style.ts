import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 2px solid #1aa562;
  border-radius: 0.5rem;
  width: fit-content;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Price = styled.div`
  background: #1aa562;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  text-align: center;
`;
