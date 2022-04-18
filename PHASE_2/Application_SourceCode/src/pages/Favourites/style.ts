import styled from 'styled-components';

export const FavouritesContent = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 40px;
`


type CountryTileProps = {
  color?: string;
}

export const countryTile = styled.button < CountryTileProps > `
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`

export const ArticleResultWrapper = styled.div`
  width: 400px;
`

export const ArticlesHolder = styled.div`
  display: flex;
  gap: 10px;
`

export const Divider = styled.hr`
  border-top: 0.1rem solid;
  color: black;
  width: 100%;
`;
