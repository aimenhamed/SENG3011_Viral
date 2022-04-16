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

export const HorizontalTile = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  flex-wrap: nowrap;
  flex: 0 0 auto;
  padding: 1rem;
  border-radius: 1.5rem;
  background: #eeee;
`;

export const SubText = styled.span`
  font-weight: normal;
`;

export const TitleText = styled.text`
  font-weight: bold;
  font-size: 1.125rem;
  align: center;
`;

export const CollapsibleButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  outline: none;
  position: relative;
  top: -15px;
  width: calc(100vw - 900px);
  //left: 200px;
  background: none;
  cursor: pointer;
  padding: 0px;
  align: center;
  flex-direction: column;
  align-items: flex-end;
`;

export const InjectionIcon = styled.div`
margin:auto;
position: relative;
//display: flex;
//left: 100px;
height: 40px;
weight: 40px;
//padding-right: 100px;
left: -300px;
top: 50px;

`;
