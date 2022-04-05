import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SubSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const MockMap = styled.div`
  border-radius: 1.5rem;
  background: #33ccee;
  width: 50%;
  padding: 6rem;
`;

export const TileLockup = styled.div`

`;

export const Tile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1.5rem;
  background: #eeee;
`;

export const SubText = styled.span`
  font-weight: normal;
`;
