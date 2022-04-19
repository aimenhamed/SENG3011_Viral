import { palette } from 'src/components/common/palette/palette';
import styled from 'styled-components';

export const FavouritesContent = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 40px;
`

export const CountryHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

type CountryTileProps = {
  color?: string;
}

export const CountryTile = styled.button < CountryTileProps > `
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background-color: ${props => props.color ? props.color : palette.white};
  height: 100px;
  border-radius: 10px;
  width: 200x;
  padding: 2rem 4rem;
  margin-left: 20px;
  transition: 0.3s;   
  :hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.05) 0 0);
  }
`

export const ArticleResultWrapper = styled.div`

`

export const ArticlesHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Divider = styled.hr`
  border-top: 0.1rem solid;
  color: black;
  width: 100%;
`;
