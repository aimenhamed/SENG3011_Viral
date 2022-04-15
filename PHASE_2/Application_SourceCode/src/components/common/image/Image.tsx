import styled from "styled-components";

interface ImageProps {
  width?: string;
  height?: string;
}

export const Image = styled.img<ImageProps>`
  height: ${(props) => (props.height ? props.height : "inherit")};
  width: ${(props) => (props.width ? props.width : "100%")};
`;
