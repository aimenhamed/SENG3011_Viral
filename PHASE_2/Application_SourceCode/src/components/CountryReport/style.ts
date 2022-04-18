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

export const TileLockup = styled.div``;

export const Tile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1.5rem;
  background: #eeee;
`;

export const Tile1 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1.5rem;
  background: #eeee;
  align-items: center;
  position: fixed;
  left: 550px;
  top: 150px;
  justify-content: space-between;
`;

export const HorizontalTile = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  flex-wrap: nowrap;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 10px;
  border-radius: 1.5rem;
  background: #eeee;
`;

export const TitleText = styled.text`
  font-weight: bold;
  font-size: 1.125rem;
  position: fixed;
  left: 550px;
  top: 100px;
  padding-left: 100px;
`;
export const CollapsibleButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  width: fit-content;
  background: none;
  flex-direction: column;
  align-items: flex-end;
`;

export const AdviceIcon = styled.img`
  height: 60px;
  width: 60px;
`;

export const Divider = styled.hr`
  border-top: 0.1rem solid;
  color: black;
  width: 100%;
`;
