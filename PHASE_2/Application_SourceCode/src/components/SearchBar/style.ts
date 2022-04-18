import styled from "styled-components";

export const SearchResultTxt = styled.p`
  color: white;
	text-decoration: none;
	font-size: small;
`;

export const SearchResultDiv = styled.div`
	background-color: #2a9763;
	padding: 1px;
	padding-left: 15px;
	border-bottom: 1px solid #e8e8e8;
	border-left: 1px solid #e8e8e8;
	border-right: 1px solid #e8e8e8;
	cursor: pointer;
`;

export const SearchInputBar = styled.input`
	border-radius: 5px;
	background-color: #e8e8e8;
	border: 0px;
	height: 25px;
	padding-left: 35px;
`;

export const ResultsParentDiv = styled.div`
	position: absolute;
	z-index: 1;
	width: 210px;
`;