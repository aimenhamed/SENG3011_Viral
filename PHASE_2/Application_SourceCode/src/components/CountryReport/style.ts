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
  align-items: center;
  align: center;
  position: relative;
  left: 50px;
  justify-content: space-between;
`;

export const Tile1 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1.5rem;
  background: #eeee;
  align-items: center;
  align: center;
  position: fixed;
  left: 550px;
  top: 150px;
  justify-content: space-between;
`;

export const Tile2 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1.5rem;
  background: #eeee;
  align-items: center;
  align: center;
  position: fixed;
  left: 1550px;
  top: 650px;
  height: 150px;
  width: 490px;
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
  width: 800px;
`;

export const SubText = styled.span`
  font-weight: normal;
`;

export const TitleText = styled.text`
  font-weight: bold;
  font-size: 1.125rem;
  position: fixed;
  left: 550px;
  top : 100px;
  padding-left: 100px;
`;

export const TitleText1 = styled.text`
  font-weight: bold;
  font-size: 1.125rem;
  position: fixed;
  right: 550px;
  top : 600px;
  padding-left: 100px;
`;

export const CollapsibleButton = styled.button`
  border: none;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 105px;
  width: fit-content;
  left: 850px;
  background: none;
  cursor: pointer;
  align: center;
  flex-direction: column;
  align-items: flex-end;
`;

export const CollapsibleButton1 = styled.button`
  border: none;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 603px;
  width: fit-content;
  right: 505px;
  background: none;
  cursor: pointer;
  align: center;
  flex-direction: column;
  align-items: flex-end;
`;

export const InjectionIcon = styled.div`
  margin:auto;
  position: fixed;
  height: 40px;
  weight: 40px;
  left: 599px;
  top: 100px;

`;

export const AdviceIcon = styled.img`
  margin:auto;
  position: fixed;
  height: 40px;
  weight: 40px;
  right: 899px;
  top: 595px;

`;

export const VirusIcon = styled.div`
  margin:auto;
  position: relative;
  height: 40px;
  weight: 40px;
  left: -55px;
  top: 40px;
  align-text: center;

`;

export const DropFlexBox = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
`;

export const DropFlexBox1 = styled.div`
  display: flex;
  width: 550px;
  justify-contents: space-between:
  flex-direction: column;
  bottom: 50px;
`;

export const DropFlexBox2 = styled.div`
  display: flex;
  justify-contents: space-between:
  flex-direction: column;
  bottom: 50px;
`;


