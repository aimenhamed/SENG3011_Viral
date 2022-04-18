import styled from "styled-components";

export const SearchResultTxt = styled.p`
  color: white;
	textDecoration: none;
	fontSize: small;
`;

export const SearchResultDiv = styled.div`
	backgroundColor: #2a9763;
	padding: 1px;
	paddingLeft: 15px;
	borderBottom: 1px solid #e8e8e8;
	borderLeft: 1px solid #e8e8e8;
	borderRight: 1px solid #e8e8e8;
	cursor: pointer;
`;

export const SearchInputBar = styled.div`
	borderRadius: 5px;
	backgroundColor: #e8e8e8;
	border: 0px;
	height: 25px;
	paddingLeft: 35px;
`;

export const ResultsParentDiv = styled.div`
	position: absolute;
	zIndex: 1;
	width: 210px;
`;